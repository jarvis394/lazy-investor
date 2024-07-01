const safeJSONParse = <T>(s: string, d: T): T => {
  try {
    return JSON.parse(s) as T
  } catch {
    return d
  }
}

export default safeJSONParse
