<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatController extends Controller
{
    /**
     * Handle custom chatbot conversations through Gemini API endpoint.
     */
    public function chat(Request $request)
    {
        $request->validate([
            'messages' => 'required|array'
        ]);

        try {
            $apiKey = env('GEMINI_API_KEY');
            if (!$apiKey) {
                return response()->json([
                    'error' => 'The GEMINI_API_KEY environment variable is missing on this server.'
                ], 500);
            }

            $messages = $request->input('messages');
            
            // Reformat messages to fit Google Gemini system format structure
            $contents = [];
            foreach ($messages as $msg) {
                $role = ($msg['role'] === 'assistant') ? 'model' : 'user';
                $contents[] = [
                    'role' => $role,
                    'parts' => [
                        ['text' => $msg['content']]
                    ]
                ];
            }

            // System Instruction Prompt
            $systemInstruction = "You are the Lead Agricultural, Livestock, and Animal Nutrition Advisory Expert at ACE Agrovet Consults. Let your tone be highly encouraging, highly practical, precise, and scientifically accurate, helping livestock and poultry farmers/agribusiness investors maximize productivity and manage farm economics.
Your specializations:
1. Poultry Farming (Layer & Broiler management, brooding conditions, egg weight optimization, vaccination logs).
2. Animal Nutrition (Feed formulate techniques such as Pearson Square mixer calculations, understanding key nutritional values e.g. Crude Protein [CP], calcium-phosphorus ratio).
3. Livestock Productivity advice (growth performance, weighting optimizations, biosecurity guards, feed conversion ratios [FCR]).
4. Farm Startup & Expansion Consulting (feasibility planning, house orientation, layout design, risk reductions).

Always answer directly using clean Markdown with readable headings. Emphasize step-by-step guidance. If a calculation is requested, perform it details-first. Keep explanations clear, professional, and humble. Never use internal directory names or paths in discussions. Mention that farmers can book a specialized training session or physical consultation with ACE Agrovet Consults for on-site services if they need deeper help.";

            // Run API requests using standard Http Client wrapper targeting the official v1 endpoint
            $response = Http::withHeaders([
                'Content-Type' => 'application/json',
                'User-Agent' => 'aistudio-build-laravel'
            ])
            ->post("https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=" . $apiKey, [
                'contents' => $contents,
                'systemInstruction' => [
                    'parts' => [
                        ['text' => $systemInstruction]
                    ]
                ],
                'generationConfig' => [
                    'temperature' => 0.7,
                ]
            ]);

            if ($response->failed()) {
                return response()->json([
                    'error' => 'The AI Advisor experienced an issue reaching the model core.',
                    'details' => $response->json()
                ], $response->status());
            }

            $data = $response->json();
            
            // Extract response candidate safely
            $aiText = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
            
            if (!$aiText) {
                $aiText = "I apologize, but I could not formulate a response at this time. Please try asking your question again.";
            }

            return response()->json([
                'content' => $aiText
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'The AI agricultural assistant team encountered an error.',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
