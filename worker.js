// Cloudflare Workers > Create Worker에 전체 내용을 붙여 넣고 Deploy 하세요.
// 배포 후 표시되는 https://....workers.dev 주소를 추출 페이지의 개인 중계 주소 칸에 입력합니다.
export default {
  async fetch(request) {
    const cors = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Expose-Headers": "X-Final-URL"
    };
    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "GET") return new Response("Method not allowed", { status: 405, headers: cors });

    const incoming = new URL(request.url);
    const target = incoming.searchParams.get("url");
    if (!target) return new Response("Missing url parameter", { status: 400, headers: cors });

    let parsed;
    try { parsed = new URL(target); }
    catch { return new Response("Invalid target URL", { status: 400, headers: cors }); }

    const allowed = ["kko.to", "melon.com"];
    if (parsed.protocol !== "https:" || !allowed.some(host => parsed.hostname === host || parsed.hostname.endsWith("." + host))) {
      return new Response("Target host not allowed", { status: 403, headers: cors });
    }

    try {
      const upstream = await fetch(parsed.toString(), {
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 Chrome/130.0.0.0 Mobile Safari/537.36",
          "Referer": "https://www.melon.com/"
        }
      });
      const body = await upstream.text();
      const headers = {
        ...cors,
        "Content-Type": upstream.headers.get("Content-Type") || "text/html; charset=utf-8",
        "Cache-Control": "no-store",
        "X-Final-URL": upstream.url || parsed.toString()
      };
      return new Response(body, { status: upstream.status, headers });
    } catch (error) {
      return new Response("Upstream fetch failed: " + (error?.message || "unknown error"), { status: 502, headers: cors });
    }
  }
};
