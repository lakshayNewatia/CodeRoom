/**
 * Type definitions for editor option configurations.
 * Features:
 * - Option metadata
 * - Type constraints
 * - Value definitions
 */

export interface EditorOption {
  currentValue: unknown;
  options?: string[];
  title: string;
  type: "boolean" | "string" | "number" | "select" | "text";
}
