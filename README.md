# 동아리 활동 기록 슬랙봇
## 개요
- 동아리 활동 기록을 대신 적어주는 슬랙봇


### 기능
1. 참여 확인 메세지 전송
  - 매일 오늘의 사서에게 사서 근무 참여 확인 메세지 전송
  - 매주 수요일 모든 사서에게 사서 회의 참여 확인 메세지 전송
  
  ![확인 메세지](/docs/확인메세지.png)

2. 확인 메세지 응답에 따라 활동 기록 추가
  - "네, 활동표에 기록해주세요" 클릭시 해당 활동과 날짜, 응답자 확인후 구글 시트에 기록

   ![기록 완료](/docs/기록완료메세지.png)


### 기술스택
- axios : http 기본 라이브러리
- [Slack node sdk](https://slack.dev/node-slack-sdk/web-api) : 슬랙 web api 편의 라이브러리
- [Google auth library](https://cloud.google.com/nodejs/docs/reference/google-auth-library/latest) : 구글 인증 편의 라이브러리

### 실행 구조
![구조도](/docs/구조도.png)
- AWS Lambda : 현재 코드, 트리거 이벤트에 따라 동작
- AWS API Gateway : 슬랙에서 사용자 interaction에 따른 POST 요청 수신, Lambda로 전달
- AWS EventBridge : 주기적으로 이벤트 발생시키기 위한 cron job

### 폴더 구조
``` shell
src/
├── constants    # 기타 상수
├── messages     # 슬랙 메세지 포맷
├── services     # 트리거에 따라 정의된 동작
└── utils        # 유틸함수
index.mjs        # lambda 기본함수, 트리거에 따라 동작수행
```

### 기타 참고사항
- 현재 레포지토리 main 브랜치에 커밋시 연결된 AWS lambda 계정 코드가 갱신되니 주의해주세요
- AWS 계정 문의 : sujikim @notusing11 