/** The severity level of a debug log entry. */
type LogTypes = 'INFO_LOG' | 'WARNING_LOG' | 'ERROR_LOG';

export interface ZSIQLoggerTypes {
  /** Namespace for the SalesIQ debug logger — enabling app-log requests and writing/reading logs (iOS). */
  Logger: {
    /** The info log severity level. */
    INFO: LogTypes;
    /** The warning log severity level. */
    WARNING: LogTypes;
    /** The error log severity level. */
    ERROR: LogTypes;

    /**
     * This API lets you request the application debug logs from the visitor. You can either choose to enable or disable the request app log feature for your operators in the SalesIQ chat window by setting the boolean value.
     * @param value - `true` to enable the request-app-log feature for operators, `false` to disable it.
     * @returns
     */
    setEnabled: (value: boolean) => void;

    /**
     * This API is used to check whether the Logger is enabled.
     * @param callback - Invoked with `true` if the logger is enabled, `false` otherwise.
     * @returns
     */
    isEnabled: (callback?: (enabled: boolean) => void) => void;

    /**
     * This API helps to set the path for recording and storing the debug Logs.
     *
     * When using this API, logs will be written in the given path, else it will be saved on the default path.
     * @param url - The file-system path where the debug logs should be recorded and stored.
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
     * @param log - The log message text to write.
     * @param level - The severity level of the log entry (`INFO_LOG`, `WARNING_LOG`, or `ERROR_LOG`).
     * @param callback - Invoked with `true` if the log was written successfully, `false` otherwise.
     * @returns
     */
    writeLogForiOS: (
      log: string,
      level: LogTypes,
      callback?: (success: boolean) => void
    ) => void;
  };
}
