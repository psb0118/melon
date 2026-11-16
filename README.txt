Melon Playlist Exporter - 모바일 버전

1. index.html을 GitHub Pages 등에 올려 웹페이지로 엽니다.
2. worker.js 내용을 Cloudflare 대시보드의 Workers & Pages > Create Worker에 붙여 넣고 Deploy 합니다.
3. 배포된 https://....workers.dev 주소를 복사합니다.
4. 추출 페이지의 '개인 중계 주소' 칸에 붙여 넣고 멜론 공개 플레이리스트 링크를 입력합니다.
5. 곡 목록을 가져온 뒤 TXT 또는 CSV로 저장합니다.

Worker 주소를 입력하면 그 주소를 우선 사용합니다. 비워 두면 공개 중계 서버를 차례로 시도하지만, 공용 서버는 시간 초과나 접근 거부가 발생할 수 있습니다.

주의: 로그인/비밀번호는 입력하지 
않습니다. 공개 플레이리스트만 지원합니다. 멜론이 Cloudflare 등 서버 요청 자체를 차단하거나 페이지 구조를 바꾸면 추출이 실패할 수 있습니다.
