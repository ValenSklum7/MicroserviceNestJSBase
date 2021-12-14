export const prepareTrace = (stackTrace: string): string[] => {
  if (/ValidationPipe/.test(stackTrace)) {
    stackTrace = 'Error: Fallo al validar parámetros de la ruta\n' + stackTrace;
  }
  return stackTrace
    .replace(/\/code\//g, '')
    .replace(/    at /g, '')
    .split('\n')
    .filter((trace) => !/processTicksAndRejections/.test(trace))
    .filter((trace) => !/^[A-Z]:/.test(trace))
    .slice(1)
    .map((trace: string, i: number) => {
      return (
        `${i + 1}# ` +
        trace.replace(/(\(.*)modules/, '(/modules').replace(/(\\)/g, '/')
      );
    });
};
