<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class BookingController extends Controller
{
    /**
     * Display a listing of bookings.
     */
    public function index()
    {
        $bookings = Booking::orderBy('created_at', 'desc')->get();
        return response()->json($bookings);
    }

    /**
     * Store a newly created booking.
     */
    public function store(Request $request)
    {
        $request->validate([
            'type' => 'required|string|in:consulting,training',
            'name' => 'required|string|max:150',
            'email' => 'required|email|max:150',
            'phone' => 'required|string|max:30',
            'category' => 'required|string|max:100',
            'details' => 'nullable|string',
            'date' => 'required|string|max:20',
        ]);

        try {
            $id = 'b-' . round(microtime(true) * 1000);
            
            $booking = Booking::create([
                'id' => $id,
                'type' => $request->input('type'),
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'phone' => $request->input('phone'),
                'category' => $request->input('category'),
                'details' => $request->input('details') ?? '',
                'date' => $request->input('date'),
                'status' => 'Pending',
                'created_at' => now()->toIso8601String()
            ]);

            // Structured logging/dispatch simulation to the physical official Yahoo Inbox:
            // This is ideal for production auditing or triggers via custom Mail classes
            Log::info("====================================================================");
            Log::info("[Form Submission Routed to: ace_vets@yahoo.com]");
            Log::info("Type: " . strtoupper($booking->type));
            Log::info("Client Name: " . $booking->name);
            Log::info("Client Contact: " . $booking->email . " | " . $booking->phone);
            Log::info("Category: " . $booking->category);
            Log::info("Details: " . ($booking->details ?: 'None'));
            Log::info("Target Date: " . $booking->date);
            Log::info("Status: Sent and logged successfully to Database.");
            Log::info("====================================================================");

            return response()->json($booking, 201);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to process booking request',
                'detail' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update status of the specified booking.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|in:Pending,Approved,Completed'
        ]);

        try {
            $booking = Booking::find($id);
            if (!$booking) {
                return response()->json(['error' => 'Booking not found'], 404);
            }

            $booking->update([
                'status' => $request->input('status')
            ]);

            return response()->json($booking);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to update booking status'], 500);
        }
    }

    /**
     * Remove the specified booking.
     */
    public function destroy($id)
    {
        try {
            $booking = Booking::find($id);
            if (!$booking) {
                return response()->json(['error' => 'Booking not found'], 404);
            }

            $booking->delete();

            return response()->json(['success' => true, 'id' => $id]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Failed to delete booking'], 500);
        }
    }
}
