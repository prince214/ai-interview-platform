"use server";

import { feedbackSchema } from "@/constants";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewByUserId(userId: string): Promise<Interview[] | []> {
    try {
        const interviews = await db
            .collection('interviews')
            .where('userid', '==', userId)
            .orderBy('createdAt', 'desc')
            .get();

        return interviews.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Interview[];
    } catch (error) {
        console.error('Error fetching interviews:', error);
        return [];
    }
}

export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | []> {
    try {
        const { userId, limit = 20 } = params;
        const interviews = await db
            .collection('interviews')
            .where('finalized', '==', true)
            .where('userid', '!=', userId)
            .limit(limit)
            .orderBy('createdAt', 'desc')
            .get();

        return interviews.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Interview[];
    } catch (error) {
        console.error('Error fetching interviews:', error);
        return [];
    }
}

export async function getInterviewById(id: string): Promise<Interview | null> {
    try {
        const interview = await db
            .collection('interviews')
            .doc(id)
            .get();

        return interview.data() as Interview | null;
    } catch (error) {
        console.error('Error fetching interview:', error);
        return null;
    }
}

export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript } = params;

    try {
        const formattedTranscript = transcript.map((sentence: { role: string, content: string }) => (
            `- ${sentence.role}: ${sentence.content}`
        )).join('');

        const { object } = await generateObject({
            model: google('gemini-2.0-flash-001', {
                structuredOutputs: false,
            }),
            schema: feedbackSchema,
            prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
            system:
                "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        })

        const feedback = {
            interviewId: interviewId,
            userId,
            totalScore: object.totalScore,
            categoryScores: object.categoryScores,
            strengths: object.strengths,
            areasForImprovement: object.areasForImprovement,
            finalAssessment: object.finalAssessment,
            transcript: formattedTranscript,
            createdAt: new Date().toISOString()
        }

        const feedbackRef = await db.collection('feedback').add(feedback);

        return {
            success: true,
            feedbackId: feedbackRef.id
        };
    } catch (error) {
        console.error('Error creating feedback:', error);
        //.error('Failed to generate feedback. Please try again later.');
        return { success: false };
    }
}

export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
    try {
        const { interviewId, userId } = params;
        const feedback = await db
            .collection('feedback')
            .where('userId', '==', userId)
            .where('interviewId', '==', interviewId)
            .limit(1)
            .get();

        if(feedback.empty) return null;

        const feedbackDoc = feedback.docs[0];
        
        return {
            id: feedbackDoc.id,
            ...feedbackDoc.data()
        } as Feedback;
    } catch (error) {
        console.error('Error fetching feedback:', error);
        return null;
    }
}