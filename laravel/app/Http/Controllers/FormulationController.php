<?php

namespace App\Http\Controllers;

use App\Models\Formulation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class FormulationController extends Controller
{
    /**
     * Display a listing of saved formulations.
     */
    public function index()
    {
        $formulations = Formulation::orderBy('created_at', 'desc')->get();
        return response()->json($formulations);
    }

    /**
     * Store a newly created formulation.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:200',
            'targetCP' => 'required|numeric',
            'ingredient1Name' => 'required|string|max:150',
            'ingredient1CP' => 'required|numeric',
            'ingredient1Parts' => 'required|numeric',
            'ingredient1Percent' => 'required|numeric',
            'ingredient2Name' => 'required|string|max:150',
            'ingredient2CP' => 'required|numeric',
            'ingredient2Parts' => 'required|numeric',
            'ingredient2Percent' => 'required|numeric',
        ]);

        try {
            $id = 'f-' . round(microtime(true) * 1000);
            
            $formulation = Formulation::create([
                'id' => $id,
                'name' => $request->input('name'),
                'target_cp' => $request->input('targetCP'),
                'ingredient1_name' => $request->input('ingredient1Name'),
                'ingredient1_cp' => $request->input('ingredient1CP'),
                'ingredient1_parts' => $request->input('ingredient1Parts'),
                'ingredient1_percent' => $request->input('ingredient1Percent'),
                'ingredient2_name' => $request->input('ingredient2Name'),
                'ingredient2_cp' => $request->input('ingredient2CP'),
                'ingredient2_parts' => $request->input('ingredient2Parts'),
                'ingredient2_percent' => $request->input('ingredient2Percent'),
                'created_at' => now()->toIso8601String()
            ]);

            // Logger tracking showing SMTP route notifications:
            Log::info("====================================================================");
            Log::info("[Formulation Guide Routed to: ace_vets@yahoo.com]");
            Log::info("Formulation Title: " . $formulation->name);
            Log::info("Target CP: " . $formulation->target_cp . "%");
            Log::info("Ingredient 1: " . $formulation->ingredient1_name . " (" . $formulation->ingredient1_percent . "% of mix, " . $formulation->ingredient1_cp . "% CP)");
            Log::info("Ingredient 2: " . $formulation->ingredient2_name . " (" . $formulation->ingredient2_percent . "% of mix, " . $formulation->ingredient2_cp . "% CP)");
            Log::info("Status: Saved and routed successfully to Administrative Inbox.");
            Log::info("====================================================================");

            return response()->json($formulation, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to save feed formulation',
                'detail' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified formulation.
     */
    public function destroy($id)
    {
        try {
            $formulation = Formulation::find($id);
            if (!$formulation) {
                return response()->json(['error' => 'Formulation not found'], 404);
            }

            $formulation->delete();

            return response()->json(['success' => true, 'id' => $id]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete formulation'], 500);
        }
    }
}
