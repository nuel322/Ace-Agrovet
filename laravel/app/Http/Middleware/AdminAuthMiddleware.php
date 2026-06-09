<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $customHeader = $request->header('x-admin-password');
        $authHeader = $request->header('Authorization');
        
        $token = null;
        if ($authHeader && str_starts_with($authHeader, 'Bearer ')) {
            $token = substr($authHeader, 7);
        }
        
        $password = $token ?: $customHeader;

        if ($password === 'Aceagrovet1234') {
            return $next($request);
        }

        return response()->json([
            'error' => 'Unauthorized access. Invalid system login sessions.'
        ], 401);
    }
}
