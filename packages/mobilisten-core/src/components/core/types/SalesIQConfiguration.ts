/**
 * This file is part of the core package for the SalesIQ plugin.
 * It contains the configuration class for SalesIQ, which includes
 * the app key, access key, and optional call view mode.
 * The SalesIQConfiguration class is used to initialize
 * and manage the configuration settings for SalesIQ in an application.
 * Parameters:
 * - appKey: The unique key generated in SalesIQ.
 * - accessKey: The access key for the brand.
 * - androidCallViewMode: Optional parameter to set the call view mode.
 */

export enum SalesIQCallViewMode {
    BANNER = 'BANNER',
    FLOATING = 'FLOATING',
}

export interface SalesIQConfiguration {
    appKey: string;
    accessKey: string;
    androidCallViewMode?: SalesIQCallViewMode | null;
}