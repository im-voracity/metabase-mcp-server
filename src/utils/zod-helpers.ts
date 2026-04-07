/**
 * Preprocessor for Zod schemas that handles JSON-stringified values.
 *
 * MCP clients (including Claude Code) serialize nested object/array parameters
 * as JSON strings before sending them to the MCP server. This preprocessor
 * JSON.parses strings so the subsequent Zod schema receives the correct type.
 *
 * Usage:
 *   z.preprocess(parseIfString, z.object({}).passthrough())
 *   z.preprocess(parseIfString, z.array(...))
 *   z.preprocess(parseIfString, z.unknown())
 */
export function parseIfString(val: unknown): unknown {
  if (typeof val === 'string') {
    try {
      return JSON.parse(val);
    } catch {
      return val;
    }
  }
  return val;
}
