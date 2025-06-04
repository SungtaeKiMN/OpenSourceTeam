# OpenSourceTeam_1
단국대학교 오픈소스 5분반 1
김성태, 문소정, 박하은

## 유통기한 알리미 EatMe!
식자재 등록 → 유통기한 마감 3일 전에 알람 → 해당 식자제에 맞는 레시피 추천 및 처리가 어려운 식자재는 이웃에 나눔하는 앱 개발

### 브랜치
- 프론트엔드: sojung / 리액트 네이티브 사용
- 백엔드: haeun / 스프링부트 사용

### 백엔드 설정
- application.yml
  - server:address 서버 주소를 변경해야합니다.
  - spring:datasource의 정보를 수정하거나 MySQL에서 같은 데이터베이스를 생성합니다. 저는 MySQL Workbench 8.0을 사용하였습니다.
  - frontend:server:url의 주소를 변경해야 합니다.

- 메일로 보내드린 json 파일을 추가하셔야 합니다.
  - src/main/java/resourses 아래에, application.yml과 같은 위치에 eateat으로 시작하는 파일을 추가합니다.
