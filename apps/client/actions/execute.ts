"use server";

interface ExecuteInput {
  args?: string[];
  code: string;
  language: string;
  stdin?: string;
}

const JUDGE0_API_URL = "https://ce.judge0.com";

const LANGUAGE_IDS: Record<string, number> = {
  python: 71,
  javascript: 63,
  typescript: 74,
  java: 62,
  cpp: 54,
  "c++": 54,
  c: 50,
};

export async function executeCode(input: ExecuteInput) {
  console.log("CODEROOM DEBUG - stdin received:", JSON.stringify(input.stdin));
  if (!input.code) {
    throw new Error("Code is required");
  }

  if (!input.language) {
    throw new Error("Language is required");
  }

  const language = input.language.toLowerCase();
  const languageId = LANGUAGE_IDS[language];

  if (!languageId) {
    return {
      language: input.language,
      version: "*",
      run: {
        stdout: "",
        stderr: `Language "${input.language}" is not currently supported.`,
        code: 1,
        signal: null,
        output: `Language "${input.language}" is not currently supported.`,
      },
      metadata: {
        args: input.args || [],
        stdin: input.stdin || "",
        timestamp: new Date().toISOString(),
      },
    };
  }

  const response = await fetch(`${JUDGE0_API_URL}/submissions?wait=true`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language_id: languageId,
      source_code: input.code,
      stdin: input.stdin || "",
      command_line_arguments: Array.isArray(input.args)
        ? input.args.join(" ")
        : "",
    }),
  });

  if (!response.ok) {
    const body = await response.text().catch(() => "");

    let detail = body;

    try {
      const parsed = JSON.parse(body);
      detail = parsed.message || JSON.stringify(parsed, null, 2);
    } catch {
      // Body is not JSON, use as-is.
    }

    const message = [
      response.status,
      detail,
      "",
      "The code execution server is unavailable.",
    ].join("\n");

    return {
      language: input.language,
      version: "*",
      run: {
        stdout: "",
        stderr: message,
        code: 1,
        signal: null,
        output: message,
      },
      metadata: {
        args: input.args || [],
        stdin: input.stdin || "",
        timestamp: new Date().toISOString(),
      },
    };
  }

  const data = await response.json();

  return {
    language: input.language,
    version: data.language?.version || "*",
    run: {
      stdout: data.stdout || "",
      stderr: data.stderr || data.compile_output || "",
      code: data.status?.id === 3 ? 0 : 1,
      signal: null,
      output:
        data.stdout || data.stderr || data.compile_output || data.message || "",
    },
    metadata: {
      args: input.args || [],
      stdin: input.stdin || "",
      timestamp: new Date().toISOString(),
      status: data.status,
      time: data.time,
      memory: data.memory,
    },
  };
}
