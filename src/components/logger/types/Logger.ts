type LogTypes = 'INFO_LOG' | 'WARNING_LOG' | 'ERROR_LOG';

export interface ZSIQLoggerTypes {
  Logger: {
    INFO: LogTypes;
    WARNING: LogTypes;
    ERROR: LogTypes;
	
	/**
	 * This API lets you request the application debug logs from the visitor. You can either choose to enable or disable the request app log feature for your operators in the SalesIQ chat window by setting the boolean value.
	 * @param value 
	 * @returns 
	 */
    setEnabled: (value: boolean) => void;

	/**
	 * This API is used to check whether the Logger is enabled.
	 * @param callback 
	 * @returns 
	 */
    isEnabled: (callback?: (enabled: boolean) => void) => void;

	/**
	 * This API helps to set the path for recording and storing the debug Logs.
	 * 
	 * When using this API, logs will be written in the given path, else it will be saved on the default path.
	 * @param url 
	 * @returns 
	 */
    setPathForiOS: (url: string) => void;

	/**
	 * This API is used to clear the written debug logs.
	 * 
	 * @returns 
	 */
    clearLogsForiOS: () => void;

	/**
	 * The logs are disabled by default. In order to use {@link ZSIQLoggerTypes.Logger ZohoSalesIQ.Logger.writeLogForiOS()} function, Ensure the bool value of `ZohoSalesIQ.Logger.setEnabled(value: boolean)` is set as true.
	 * 
	 * @param log 
	 * @param level 
	 * @param callback 
	 * @returns 
	 */
    writeLogForiOS: (
      log: string,
      level: LogTypes,
      callback?: (success: boolean) => void
    ) => void;
  };
}