<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Formulation;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    /**
     * Escape variable safely for raw INSERT MySQL statements.
     */
    private function escapeSQL($val)
    {
        if ($val === null || $val === '') {
            return 'NULL';
        }
        if (is_numeric($val)) {
            return $val;
        }
        $escaped = str_replace("'", "''", $val);
        return "'" . $escaped . "'";
    }

    /**
     * Export complete database (bookings & formulations) as an executable MySQL Script.
     */
    public function exportDB()
    {
        try {
            $bookings = Booking::all();
            $formulations = Formulation::all();

            $sql = "-- =========================================================================\n";
            $sql .= "-- ACE AGROVET CONSULTS - Production MySQL Database Schema & Data Dump --\n";
            $sql .= "-- Generated At: " . now()->toIso8601String() . "\n";
            $sql .= "-- Designed for: Direct cPanel MySQL/MariaDB Execution\n";
            $sql .= "-- =========================================================================\n\n";
            $sql .= "START TRANSACTION;\n\n";

            // 1. Table structure for bookings
            $sql .= "-- -----------------------------------------------------\n";
            $sql .= "-- Table Structure for bookings\n";
            $sql .= "-- -----------------------------------------------------\n";
            $sql .= "DROP TABLE IF EXISTS `bookings`;\n";
            $sql .= "CREATE TABLE `bookings` (\n";
            $sql .= "  `id` VARCHAR(50) NOT NULL,\n";
            $sql .= "  `type` VARCHAR(20) NOT NULL,\n";
            $sql .= "  `name` VARCHAR(150) NOT NULL,\n";
            $sql .= "  `email` VARCHAR(150) NOT NULL,\n";
            $sql .= "  `phone` VARCHAR(30) NOT NULL,\n";
            $sql .= "  `category` VARCHAR(100) NOT NULL,\n";
            $sql .= "  `details` TEXT NULL,\n";
            $sql .= "  `date` VARCHAR(20) NOT NULL,\n";
            $sql .= "  `status` VARCHAR(20) NOT NULL DEFAULT 'Pending',\n";
            $sql .= "  `created_at` VARCHAR(50) NOT NULL,\n";
            $sql .= "  PRIMARY KEY (`id`)\n";
            $sql .= ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";

            // Data rows for bookings
            if ($bookings->count() > 0) {
                $sql .= "-- Seed Data components for bookings\n";
                foreach ($bookings as $b) {
                    $sql .= "INSERT INTO `bookings` (`id`, `type`, `name`, `email`, `phone`, `category`, `details`, `date`, `status`, `created_at`) VALUES (\n";
                    $sql .= "  " . $this->escapeSQL($b->id) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->type) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->name) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->email) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->phone) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->category) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->details) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->date) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->status) . ",\n";
                    $sql .= "  " . $this->escapeSQL($b->created_at) . "\n";
                    $sql .= ") ON DUPLICATE KEY UPDATE \n";
                    $sql .= "  `type` = VALUES(`type`),\n";
                    $sql .= "  `name` = VALUES(`name`),\n";
                    $sql .= "  `email` = VALUES(`email`),\n";
                    $sql .= "  `phone` = VALUES(`phone`),\n";
                    $sql .= "  `category` = VALUES(`category`),\n";
                    $sql .= "  `details` = VALUES(`details`),\n";
                    $sql .= "  `date` = VALUES(`date`),\n";
                    $sql .= "  `status` = VALUES(`status`),\n";
                    $sql .= "  `created_at` = VALUES(`created_at`);\n\n";
                }
            }

            // 2. Table structure for formulations
            $sql .= "-- -----------------------------------------------------\n";
            $sql .= "-- Table Structure for formulations\n";
            $sql .= "-- -----------------------------------------------------\n";
            $sql .= "DROP TABLE IF EXISTS `formulations`;\n";
            $sql .= "CREATE TABLE `formulations` (\n";
            $sql .= "  `id` VARCHAR(50) NOT NULL,\n";
            $sql .= "  `name` VARCHAR(200) NOT NULL,\n";
            $sql .= "  `target_cp` DECIMAL(5, 2) NOT NULL,\n";
            $sql .= "  `ingredient1_name` VARCHAR(150) NOT NULL,\n";
            $sql .= "  `ingredient1_cp` DECIMAL(5, 2) NOT NULL,\n";
            $sql .= "  `ingredient1_parts` DECIMAL(10, 4) NOT NULL,\n";
            $sql .= "  `ingredient1_percent` DECIMAL(5, 2) NOT NULL,\n";
            $sql .= "  `ingredient2_name` VARCHAR(150) NOT NULL,\n";
            $sql .= "  `ingredient2_cp` DECIMAL(5, 2) NOT NULL,\n";
            $sql .= "  `ingredient2_parts` DECIMAL(10, 4) NOT NULL,\n";
            $sql .= "  `ingredient2_percent` DECIMAL(5, 2) NOT NULL,\n";
            $sql .= "  `created_at` VARCHAR(50) NOT NULL,\n";
            $sql .= "  PRIMARY KEY (`id`)\n";
            $sql .= ") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;\n\n";

            // Data rows for formulations
            if ($formulations->count() > 0) {
                $sql .= "-- Seed Data components for formulations\n";
                foreach ($formulations as $f) {
                    $sql .= "INSERT INTO `formulations` (`id`, `name`, `target_cp`, `ingredient1_name`, `ingredient1_cp`, `ingredient1_parts`, `ingredient1_percent`, `ingredient2_name`, `ingredient2_cp`, `ingredient2_parts`, `ingredient2_percent`, `created_at`) VALUES (\n";
                    $sql .= "  " . $this->escapeSQL($f->id) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->name) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->target_cp) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient1_name) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient1_cp) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient1_parts) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient1_percent) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient2_name) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient2_cp) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient2_parts) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->ingredient2_percent) . ",\n";
                    $sql .= "  " . $this->escapeSQL($f->created_at) . "\n";
                    $sql .= ") ON DUPLICATE KEY UPDATE \n";
                    $sql .= "  `name` = VALUES(`name`),\n";
                    $sql .= "  `target_cp` = VALUES(`target_cp`),\n";
                    $sql .= "  `ingredient1_name` = VALUES(`ingredient1_name`),\n";
                    $sql .= "  `ingredient1_cp` = VALUES(`ingredient1_cp`),\n";
                    $sql .= "  `ingredient1_parts` = VALUES(`ingredient1_parts`),\n";
                    $sql .= "  `ingredient1_percent` = VALUES(`ingredient1_percent`),\n";
                    $sql .= "  `ingredient2_name` = VALUES(`ingredient2_name`),\n";
                    $sql .= "  `ingredient2_cp` = VALUES(`ingredient2_cp`),\n";
                    $sql .= "  `ingredient2_parts` = VALUES(`ingredient2_parts`),\n";
                    $sql .= "  `ingredient2_percent` = VALUES(`ingredient2_percent`),\n";
                    $sql .= "  `created_at` = VALUES(`created_at`);\n\n";
                }
            }

            $sql .= "COMMIT;\n";

            $filename = 'ace_agrovet_database_backup_' . date('Y-m-d') . '.sql';

            return response($sql, 200, [
                'Content-Type' => 'application/sql',
                'Content-Disposition' => 'attachment; filename="' . $filename . '"',
                'Pragma' => 'no-cache',
                'Expires' => '0'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Failed to export administrative database',
                'details' => $e->getMessage()
            ], 500);
        }
    }
}
