# **Questionity MVP 랜딩페이지 마케팅 기획 및 프론트엔드 아키텍처 설계 보고서**

## **서론: 대학로 기반 복합 커뮤니티의 Authentic Pre-launch 전략**

대학로 기반의 신생 복합 커뮤니티 'Questionity'의 초기 시장 진입(Go-to-Market)을 위한 MVP 랜딩페이지는 단순한 정보 제공 창구를 넘어, 고도의 심리적 훅(Hook)과 기술적 몰입감을 제공하는 그로스 해킹(Growth Hacking) 엔진으로 기능해야 한다. 대학로는 전통적으로 '회전 관극(동일 작품을 다회차 관람하는 행위)'으로 대변되는 강력한 팬덤 문화와 예술적 소비가 교차하는 공간이다1. 이러한 지리적, 문화적 특성을 디지털 커뮤니티로 전이하기 위해, 본 랜딩페이지는 "파운딩 멤버 100인 모집"이라는 희소성 기반의 명확한 전환 목표(Conversion Goal)를 설정하였다.  
초기 커뮤니티가 직면하는 가장 큰 문제인 '콜드 스타트(Cold Start)'를 극복하기 위해 본 기획은 철저한 투명성에 기반한 'Authentic Pre-launch' 전략을 채택한다. 아직 생성되지 않은 모임과 독후감을 허위로 포장하는 대신, 해당 데이터가 "AI가 예측한 가상 프리뷰"임을 당당히 명시함으로써 오히려 사용자의 호기심을 자극하고 신뢰를 구축한다. 이와 동시에, 이미 배포되어 운영 중인 외부 공간 서비스 'Work & Share'로의 트래픽 브릿지 역할을 수행하도록 세련된 컴포넌트 배치를 기획하였다.  
본 기획의 가장 핵심적인 차별화 요소는 단순한 고객 지원(CS) 용도를 탈피한 'Proactive 다중 모드 AI 챗봇'의 도입이다. 알라딘(Aladin) Open API와 Vercel AI SDK가 결합된 이 챗봇은 도서 기반의 엔터테인먼트 마케터로서 사용자의 컨텍스트에 선제적으로 개입한다2. 챗봇과의 마이크로 인터랙션은 궁극적으로 잠재 고객의 리드(Leads)를 수집하는 강력한 온디맨드 방 개설 프로세스로 직결되며, 이는 프론트엔드 아키텍처와 백엔드 데이터베이스(Supabase)의 유기적인 결합을 통해 완성된다.

## **1\. 마케팅 최적화 스토리보드 설계**

전환율 최적화(CRO) 관점에서 Questionity 랜딩페이지는 인지(Awareness), 흥미(Interest), 욕망(Desire), 행동(Action)의 퍼널을 시각적, 상호작용적 요소로 치밀하게 구현한다. 각 섹션은 사용자의 스크롤 흐름에 따라 점진적으로 몰입도를 높이도록 설계되었다.

### **파운딩 멤버 모집 Hero 섹션의 심리적 설계**

Hero 섹션은 랜딩페이지의 첫인상을 결정하며, 3초 이내에 서비스의 핵심 가치 제안(Value Proposition)을 전달해야 한다. 메인 카피라이팅은 "질문이 모여 지성이 되는 공간, Questionity. 첫 여정을 함께할 파운딩 멤버 100인을 모십니다."로 설정하여 소속감과 희소성을 동시에 자극한다. 이에 대한 보조 장치로 서브 카피라이팅에는 "본 페이지의 독서 모임과 리뷰는 여러분을 위해 AI가 예측한 가상 프리뷰입니다. 지금 바로 원하는 모임의 첫 번째 대기자가 되어주세요."라는 문구를 배치하여 투명성을 담보한 Authentic Pre-launch 전략을 완성한다.  
시각적 연출에 있어서는 Framer Motion 라이브러리를 활용한 텍스트 롤업 애니메이션을 적용한다. 텍스트 요소들이 순차적으로 등장하도록 지연(stagger) 효과를 주어 시선을 집중시키며, 백그라운드는 대학로의 역동적인 문화 공간을 상징하는 앰비언트 그라데이션이 미세하게 변화하도록 배치한다4. 화면 중앙에는 접근성을 극대화한 콜투액션(CTA) 버튼을 배치하고, 이를 클릭할 경우 하단의 Supabase 연동 리드 수집 폼으로 화면이 부드럽게 전환되거나 반응형 다이얼로그가 호출되도록 유도한다5.

### **Work & Share 공간 브릿지 및 Bento Grid 마케팅**

대학로의 오프라인 공간이라는 물리적 실체를 인지시키는 것은 디지털 커뮤니티의 신뢰도를 높이는 핵심 기재다. 이를 위해 공간 소개 섹션은 현대적이고 세련된 비대칭 그리드 레이아웃인 Bento Grid(도시락 형태의 레이아웃)로 구성한다6.

| 컴포넌트 요소 | 시각적 특징 및 인터랙션 로직 | 기대 효과 |
| :---- | :---- | :---- |
| **공간 썸네일 타일** | 고해상도의 커피챗 라운지, 집중 업무 공간 사진을 비대칭 크기의 타일로 CSS Grid 기반 배치 | 공간의 심미성을 강조하고 사용자 체류 시간 증대 |
| **호버 액션 (Hover)** | 마우스 오버 시 이미지가 미세하게 확대(scale-up)되며 어두운 오버레이와 함께 "Work & Share 공간 둘러보기 ↗" 텍스트 렌더링 | 직관적인 클릭 유도(Affordance) 제공 |
| **외부 링크 연동** | 클릭 시 https://work-and-share.vercel.app/ 로 즉시 이동. target="\_blank" 속성 적용 | 이탈률을 최소화하며 두 서비스 간의 매끄러운 트래픽 전이 |

이러한 Bento Grid 구조는 모바일 환경에서는 단일 열(Single Column)로 자연스럽게 재배열되도록 Tailwind CSS의 반응형 유틸리티 클래스를 적용하여 모바일 퍼스트(Mobile-first) 경험을 훼손하지 않도록 설계한다.

### **AI 가상 프리뷰 롤링 애니메이션 영역**

아직 실제 회원이 활동하지 않는 Pre-launch 단계의 약점을 극복하기 위해, AI가 생성한 '가상 독서방 카탈로그'와 '독후감'을 무한 스크롤 마키(Marquee) 애니메이션으로 노출한다. 이 영역은 정적인 페이지에 역동성을 부여하며, 미래의 활성화된 커뮤니티 모습을 사용자에게 시각적으로 투영하는 역할을 한다.  
구현의 기술적 완성도를 높이기 위해 Next.js의 Server Components에서 Supabase의 virtual\_rooms 및 virtual\_reviews 테이블 데이터를 사전 조회(Fetching)한다. 조회된 데이터는 Client Component로 전달되어 Framer Motion의 애니메이션 속성을 통해 가로 방향으로 끊김 없이 흐르도록 구현된다. 무한 스크롤 시 끝부분에서 발생하는 공백을 방지하기 위해 원본 데이터 배열을 복제하여 \[...items, ...items\] 형태로 렌더링하고, transform: translateX(-50%) 로직을 활용해 자연스러운 루프를 생성한다7.  
각 프리뷰 카드에는 유리 질감(Glassmorphism) 효과를 주어 배경 위를 부유하는 듯한 미래지향적 감각을 제공하며, 카드 상단에는 "✨ AI Predicted"라는 명시적인 뱃지를 달아 가상 데이터임을 투명하게 알린다. 마우스 호버 시 마키 롤링이 일시 정지되며 "이 방 개설 투표하기" 버튼이 활성화되는 마이크로 인터랙션을 통해 단순 관람을 넘어선 능동적 참여를 이끌어낸다8.

## **2\. Proactive AI Chatbot 다중 모드 아키텍처 및 시나리오**

본 랜딩페이지의 핵심 전환 도구인 AI 챗봇은 사용자가 질문하기 전까지 대기하는 수동적 인터페이스가 아니다. Vercel AI SDK의 강력한 스트리밍 및 도구 호출(Tool Calling) 기능과 알라딘(Aladin) Open API의 방대한 도서 데이터를 결합하여, 사용자의 상황에 선제적으로 개입하는 'Proactive 다중 모드 마케터'로 기능한다2.

### **다중 모드 챗봇의 기술적 기반**

챗봇 시스템은 Next.js App Router의 Route Handler(app/api/chat/route.ts)를 서버 백엔드로 사용하며, 클라이언트에서는 @ai-sdk/react의 useChat 훅을 통해 상태를 관리한다10. 알라딘 API와의 통신을 위해 인증키인 TTBKey를 활용하며, ItemSearch.aspx(도서 검색), ItemList.aspx(리스트 조회) 엔드포인트를 호출한다12. 이때 응답 포맷을 일관된 JSON으로 파싱하고 표지 이미지(cover) 등 최신 필드를 누락 없이 확보하기 위해 파라미터로 output=js 및 Version=20131101을 반드시 명시하여 호출한다3.

| 챗봇 모드 | 트리거(Trigger) 조건 | 활용 API 엔드포인트 및 파라미터 | 프론트엔드 UI 렌더링 방식 |
| :---- | :---- | :---- | :---- |
| **오늘의 책 타로 & MBTI** | 10초 이상 체류 또는 이탈 의도(Exit-Intent) 감지 시 선제 팝업 | ItemSearch.aspx (Query=감정/MBTI 추출 키워드) | 도서 표지 이미지(cover)를 활용한 타로 카드 형태의 Generative UI |
| **실시간 트렌드 알리미** | 챗봇 창 오픈 후 5초간 유휴(Idle) 상태 유지 시 | ItemList.aspx (QueryType=Bestseller, CategoryId=170) | 1위 도서 상세 정보 및 소개 텍스트 다이내믹 렌더링 |
| **온디맨드 방 개설 요청** | 사용자가 특정 책 제목이나 저자를 채팅창에 직접 입력 시 | ItemSearch.aspx (Query=사용자 입력 텍스트) | 도서 정보 노출 후 즉각적인 리드 수집용 입력 폼(Form) 컴포넌트 렌더링 |

### **\[모드 1\] 오늘의 책 타로 & MBTI 매칭 시나리오**

이 모드는 사용자의 개인화된 감정과 성향을 매개로 자연스러운 대화를 유도하는 훅이다. 사용자가 랜딩페이지에 10초 이상 머무르거나 페이지를 이탈하려는 찰나에 챗봇 아이콘이 흔들리는 애니메이션과 함께 선제적인 메시지가 출력된다. 챗봇은 "오늘 하루 어땠나요? 기분이나 MBTI를 텍스트로 알려주시면, 오늘 읽기 딱 좋은 책을 타로 카드처럼 뽑아드릴게요\! 🔮"라며 대화를 시작한다.  
사용자가 "오늘 회사에서 깨져서 너무 우울해. 내 MBTI는 INFP야."라고 입력하면, Vercel AI SDK를 통해 구동되는 언어 모델은 해당 텍스트에서 '위로, 에세이, 치유'와 같은 핵심 키워드를 추출하여 searchBookTarot 도구(Tool)를 호출한다. 서버는 이 키워드를 알라딘 API의 Query 파라미터로 전달하여 적합한 도서 데이터를 확보한다12. 백엔드에서 반환된 결과는 클라이언트의 useChat 훅에서 part.type \=== 'tool-invocation' 상태로 감지되며, 단순 텍스트가 아닌 실제 도서 표지 이미지가 포함된 화려한 타로 카드 UI 컴포넌트로 채팅창 내부에 동적 렌더링된다14. 직후 챗봇은 "위로가 필요한 INFP에게 완벽한 처방전이 될 책입니다. 이 책으로 첫 가상 독서방을 신청해 볼까요?"라며 자연스럽게 다음 퍼널로 유도한다.

### **\[모드 2\] 실시간 트렌드 알리미 시나리오**

사용자가 챗봇 대화창을 열었으나 무엇을 입력할지 몰라 방치하는 유휴(Idle) 상태를 타개하기 위한 모드다. 5초간 입력이 감지되지 않으면 챗봇은 "아참, 지금 알라딘 경제경영 베스트셀러 1위가 뭔지 아시나요? 👀 궁금하면 '알려줘'라고 입력해 보세요\!"라며 호기심을 자극한다.  
사용자가 이에 응답하면, 백엔드에서는 getRealtimeBestseller 도구를 실행한다. 이 도구는 알라딘 ItemList.aspx API에 QueryType=Bestseller, SearchTarget=Book, CategoryId=170(경제경영) 등의 파라미터를 결합하여 실시간 1위 도서를 Fetching 한다16. 조회된 도서의 표지, 제목, 저자, 그리고 한 줄 소개(description)가 채팅창에 즉각적으로 노출되며, "지금 가장 핫한 이 책, Questionity에서 같이 읽을 파운딩 멤버를 모아볼까요?"라는 메시지를 통해 커뮤니티 참여 욕구를 자극한다3.

### **\[모드 3\] 온디맨드 방 개설 요청 시나리오**

이 모드는 사용자의 명시적인 관심사를 리드(Leads)로 직결시키는 가장 강력한 전환 시나리오다. 사용자가 채팅창에 "도둑맞은 집중력 독서 모임 있나요?"와 같이 직접 도서명을 입력할 경우 트리거된다. AI는 searchAndCreateRoom 도구를 호출하여 알라딘 ItemSearch.aspx API를 통해 해당 책의 정확한 서지 정보를 검색한다13.  
검색된 책 정보가 카드 형태로 나타난 직후, 챗봇은 "아쉽게도 아직 개설된 모임은 없지만, 이 책으로 새로운 독서방을 열어드릴까요? 1호 대기자로 등록해 주세요\!"라고 제안한다. 동시에 채팅 인터페이스 내부에는 이름, 연락처, 이메일을 입력할 수 있는 React Form 컴포넌트가 Generative UI 형태로 렌더링된다18. 사용자가 폼을 제출하면 해당 데이터는 Supabase의 leads 테이블로 안전하게 INSERT 되며, 화면에는 폭죽(Confetti) 애니메이션과 함께 대기자 등록 완료 메시지가 출력되어 사용자에게 즉각적인 성취감과 보상을 제공한다.

## **3\. 프론트엔드 아키텍처 및 바이브 코딩 하위 프롬프트 5종**

본 기획을 실제 프로덕션 수준의 코드로 완벽하게 구현하기 위해, AI 코딩 어시스턴트(Cursor, GitHub Copilot 등)에 직접 주입할 수 있는 5종의 바이브 코딩(Vibe Coding) 프롬프트를 설계하였다. 각 프롬프트는 프론트엔드 아키텍처의 의도, 기술적 제약 사항, UI/UX 디테일을 엄밀하게 규정하여 인간 전문가 수준의 코드를 유도한다.

### **3.1. 인프라 셋업 및 GNB 개발 (Prompt 1\)**

가장 먼저 진행되어야 할 작업은 Next.js App Router 기반의 프로젝트 뼈대를 잡고, 서버리스 데이터베이스인 Supabase와의 통신 환경을 구축하는 것이다. 글로벌 네비게이션 바(GNB)는 사용자의 스크롤에 반응하여 배경 질감이 변하는 동적 헤더로 구성되며, 앞서 마케팅 스토리보드에서 강조한 'Work & Share' 외부 링크 연동을 최우선으로 배치한다. 보안과 사용성 측면에서 외부 링크는 반드시 새 탭으로 열리도록 속성을 강제해야 한다.

| 기술 요소 | 명세 및 요구사항 |
| :---- | :---- |
| **프레임워크** | Next.js 14/15 App Router, TypeScript, Tailwind CSS |
| **BaaS 연동** | @supabase/supabase-js를 활용한 클라이언트 싱글톤 구성 |
| **GNB 애니메이션** | 스크롤 시 투명 배경에서 backdrop-blur-md 및 솔리드 컬러로 부드러운 전환 |
| **외부 링크 보안** | target="\_blank" 및 rel="noopener noreferrer" 필수 적용 |

# **Role & Task**

너는 Next.js App Router와 Tailwind CSS 기반의 시니어 프론트엔드 아키텍트야.  
'Questionity' 랜딩페이지의 초기 셋업과 글로벌 네비게이션 바(GNB), Supabase Client 구성을 진행해 줘.

# **Technical Specifications**

> 1. **프로젝트 셋업:** Next.js App Router, TypeScript, Tailwind CSS를 사용해. components/ui 폴더에 shadcn/ui 컴포넌트들을 담을 준비를 해.  
> 2. **Supabase Client:** @supabase/supabase-js를 사용하여 utils/supabase/client.ts에 브라우저용 클라이언트를 싱글톤으로 구성해. 환경 변수 NEXT\_PUBLIC\_SUPABASE\_URL와 NEXT\_PUBLIC\_SUPABASE\_ANON\_KEY를 참조하도록 해.  
> 3. **GNB 컴포넌트 (components/layout/Navbar.tsx):**  
   * Fixed header로 스크롤 시 배경이 투명(transparent)에서 반투명(블러, backdrop-blur-md) 및 솔리드 컬러로 부드럽게 전환(transition-colors duration-300)되게 만들어 줘.  
   * 우측에는 CTA 버튼("파운딩 멤버 신청")과 함께, **Work & Share 외부 링크** 텍스트 버튼을 배치해.  
   * 외부 링크의 href는 https://work-and-share.vercel.app/ 이며, 보안과 사용자 경험을 위해 반드시 target="\_blank"와 rel="noopener noreferrer" 속성을 적용해.  
   * GNB의 좌측 로고 영역에는 'Questionity' 텍스트를 세련된 폰트 굵기(font-bold)와 자간(tracking-tighter)으로 구현해 줘.

# **Output Format**

완벽하게 작동하는 코드를 작성하고, 패키지 설치 명령어(npm/pnpm)를 주석으로 상단에 포함해 줘. 파일 경로는 파일명 상단에 명시할 것.

### **3.2. 모션 기반 Hero 및 Bento Grid 섹션 (Prompt 2\)**

Hero 섹션과 공간 소개 섹션은 시각적 임팩트가 가장 강해야 하는 영역이다. Framer Motion을 사용하여 텍스트가 순차적으로 떠오르는 지연(stagger) 애니메이션을 구현하고, 투명성을 강조하는 카피를 시각적 계층 구조에 맞게 배치한다. Bento Grid는 CSS Grid 레이아웃을 통해 비대칭 타일을 생성하며, 호버 시 크기 확대와 텍스트 노출 효과를 주어 외부 링크 클릭을 극대화한다6. 모바일 환경에서는 레이아웃이 1열로 무너지는 반응형 규칙을 적용하여 가독성을 보장해야 한다.

| 기술 요소 | 명세 및 요구사항 |
| :---- | :---- |
| **Hero 애니메이션** | Framer Motion staggerChildren 적용, Y축 이동 및 페이드인 |
| **Bento Grid** | Tailwind CSS grid-cols-1 md:grid-cols-3 및 row-span, col-span 적용 |
| **마이크로 인터랙션** | 썸네일 타일 호버 시 scale-105 및 다크 그라데이션 오버레이 트랜지션 적용 |

# **Role & Task**

너는 애니메이션과 시각적 레이아웃에 정통한 UI/UX 엔지니어 닌자야.  
'Questionity'의 Hero 섹션과 'Work & Share' 공간을 홍보하는 Bento Grid 섹션을 Framer Motion을 사용하여 역동적으로 구현해 줘.

# **Technical Specifications**

> 1. **Hero Section (components/sections/Hero.tsx):**  
   * 뷰포트 높이(min-h-screen)를 꽉 채우고, 텍스트 요소들(메인 카피, 서브 카피, CTA 버튼)이 Framer Motion의 staggerChildren을 사용해 아래에서 위로(y: 20 \-\> 0\) 부드럽게 페이드인 되도록 애니메이션을 적용해.  
   * 서브 카피에는 "본 페이지의 모임과 독후감은 AI가 예측한 가상 프리뷰입니다"라는 문구를 은은한 색상(text-muted-foreground)으로 배치하여 투명성을 확보해.  
> 2. **Bento Grid Section (components/sections/SpaceBento.tsx):**  
   * Tailwind의 CSS Grid(grid-cols-1 md:grid-cols-3, grid-rows-2, col-span, row-span)를 활용해 비대칭 도시락 레이아웃(Bento Grid)을 만들어 줘.  
   * 각 타일(Card)은 공간 썸네일 이미지를 배경(object-cover)으로 가지며, 마우스 Hover 시 이미지 스케일 업(group-hover:scale-105), 어두운 그라데이션 오버레이, 그리고 우측 하단에 "Work & Share 공간 둘러보기 ↗" 텍스트가 나타나도록 해 (Tailwind의 group 클래스 활용).  
   * 타일 전체를 \<a href="https://work-and-share.vercel.app/" target="\_blank" rel="noopener noreferrer"\>로 감싸서 외부 공간으로 트래픽을 강력하게 유도해 줘.

# **Constraints**

반응형(Mobile-first) 디자인을 반드시 적용하여, 모바일 환경에서는 Grid가 1열(flex-col 또는 grid-cols-1)로 자연스럽게 무너지도록 처리해. 코드를 반환해 줘.

### **3.3. Supabase 연동 마키(Marquee) 롤링 컴포넌트 (Prompt 3\)**

가상 데이터 전시를 위한 마키(Marquee) 효과는 서버 컴포넌트에서의 데이터 패칭과 클라이언트 컴포넌트에서의 애니메이션 처리가 결합된 고도의 작업이다. Supabase 데이터베이스에서 가상 독서방과 예측 독후감 데이터를 서버 측에서 빠르고 안전하게 읽어온 후, 화면에 끊김 없이 흐르도록 Framer Motion을 설정한다. 이때 배열을 두 배로 복제하여 뷰포트 너비를 채우는 것이 무한 롤링 구현의 핵심 기법이다7. 마우스 호버 시 롤링이 정지되어야 하므로 animation-play-state 제어 로직이 포함된다8.

| 기술 요소 | 명세 및 요구사항 |
| :---- | :---- |
| **데이터 패칭** | Server Component에서 Supabase 인스턴스를 통해 virtual\_rooms 데이터 사전 로드 |
| **무한 스크롤 로직** | 데이터 배열 복제(\[...items, ...items\]), X축 이동(0%에서 \-50%로 무한 반복 루프) |
| **카드 UI 렌더링** | Glassmorphism 스타일 적용, "✨ AI Predicted" 뱃지 시각화, 마우스 호버 시 멈춤 제어 |

# **Role & Task**

너는 풀스택 역량을 갖춘 프론트엔드 개발자야.  
Supabase Database에서 데이터를 Fetching 한 뒤, 이를 끊김 없이 가로로 흐르는 무한 롤링(Marquee) 컴포넌트로 구현해 줘.

# **Technical Specifications**

> 1. **Data Fetching (Server Component \- app/page.tsx 또는 래퍼 컴포넌트):**  
   * Supabase 서버 클라이언트를 이용해 virtual\_rooms (가상 모임 정보) 및 virtual\_reviews (AI 예측 독후감) 테이블에서 데이터를 조회해.  
   * 데이터 구조는 { id, title, description, cover\_url, predicted\_by: 'AI' } 형태를 띈다고 가정해.  
> 2. **Infinite Marquee Component (components/ui/Marquee.tsx):**  
   * Framer Motion을 사용하여 가로 방향 무한 스크롤 애니메이션을 구현해.  
   * 원활한 무한 루프를 위해 데이터를 복제(예: \[...items, ...items\])하여 화면 폭을 충분히 덮도록 렌더링하고, animate={{ x: \["0%", "-50%"\] }} 및 transition={{ repeat: Infinity, ease: "linear", duration: 20 }} 설정을 적용해.  
   * 컴포넌트 내 카드(Card)에는 유리 질감(Glassmorphism: bg-white/10 backdrop-blur-lg border border-white/20) 스타일을 적용해.  
   * 각 카드 상단에 투명성(Authentic Pre-launch)을 상징하는 "✨ AI Predicted" 뱃지를 Tailwind로 구현해.  
> 3. **인터랙션:** 마우스 호버 시 롤링이 멈추는 기능(Framer Motion의 animation-play-state: paused 등)을 추가할 것.

# **Execution**

Supabase 쿼리 로직의 가상 코드와 마키 컴포넌트의 클라이언트 코드("use client")를 명확히 분리해서 작성해 줘.

### **3.4. Vercel AI SDK 및 알라딘 API 통합 챗봇 아키텍처 (Prompt 4\)**

챗봇은 이번 기획의 '킬러 피처(Killer Feature)'이므로 서버 라우트와 클라이언트의 실시간 스트리밍 관리가 완벽하게 동기화되어야 한다. 서버 측에서는 Vercel AI SDK의 streamText 함수 내에 알라딘 API를 호출하는 세 가지 고유한 도구(Tools)를 정의한다10. 알라딘 API의 응답을 JSON 형식으로 안전하게 받아오기 위해 Version=20131101 설정과 TTBKey 환경변수 맵핑이 필수적이다3. 클라이언트 측에서는 useChat 훅을 통해 반환된 message.parts를 순회하며 tool-invocation 발생 시 텍스트 대신 React 컴포넌트를 Generative UI 방식으로 렌더링하도록 처리한다15.

| 기술 요소 | 명세 및 요구사항 |
| :---- | :---- |
| **서버 라우트 핸들러** | streamText, convertToModelMessages, 도구(tool) 함수 정의, 최대 실행 시간(maxDuration) 30초 할당 |
| **알라딘 API 통신** | ItemSearch.aspx, ItemList.aspx 활용. 필수 파라미터 ttbkey, output=js, Version=20131101 포함 |
| **클라이언트 상태 관리** | @ai-sdk/react의 useChat을 활용한 스트리밍 처리 및 유휴 시간(5초) 감지 선제 메시지 발송 |
| **Generative UI 렌더링** | part.type \=== 'tool-invocation' 상태 분기, 타로 카드 형태의 도서 표지 및 커스텀 UI 렌더링 |

# **Role & Task**

너는 AI 인프라 연동과 대화형 UI 설계의 최고 전문가야.  
Vercel AI SDK (버전 5 기반)와 알라딘 Open API를 결합하여 화면 우측 하단에 플로팅되는 'Proactive AI Chatbot'의 라우트 로직과 클라이언트 UI를 구축해 줘.

# **Technical Architecture**

> 1. **Server Route Handler (app/api/chat/route.ts):**  
   * ai 패키지의 streamText, convertToModelMessages, tool 함수를 사용해.  
   * tools 객체 내에 3가지 도구를 선언해:  
     1. searchBookTarot: MBTI/감정 키워드를 받아 알라딘 ItemSearch.aspx API를 호출해 도서(표지 포함)를 반환. (파라미터: ttbkey, Query, output=js, Version=20131101)  
     2. getRealtimeBestseller: 알라딘 ItemList.aspx로 경제경영(170) 베스트셀러 1위 조회.  
     3. searchAndCreateRoom: 책 제목을 검색해 책 정보를 반환하며, 클라이언트 측에서 방 개설 폼 렌더링을 유도함.  
   * 알라딘 API 호출 시 fetch를 사용하고 JSON 응답을 적절히 파싱해 도서 배열의 첫 번째 객체를 반환하도록 해.  
> 2. **Client Chat UI (components/chat/FloatingChat.tsx):**  
   * @ai-sdk/react의 useChat 훅을 사용해 상태를 관리해.  
   * 채팅창이 로드되고 유저가 아무 액션이 없으면(5초 딜레이) 챗봇이 선제적으로 메시지를 띄우게 해("오늘 하루 어땠나요? MBTI를 알려주세요\!").  
   * message.parts를 순회하며 part.type \=== 'tool-invocation'일 때의 UI를 분기 처리해.  
   * 도구 호출 결과(toolInvocation.toolName \=== 'searchBookTarot' 등)가 반환되면, 일반 텍스트가 아닌 책 표지 이미지(cover 속성)와 텍스트가 조합된 아름다운 카드 UI(타로 카드 형태)를 채팅창 말풍선 위치에 렌더링하도록 작성해.

# **Note**

알라딘 API의 인증키(TTBKey)는 서버의 process.env.ALADIN\_TTB\_KEY에서 가져오도록 작성하고, maxDuration을 여유 있게(예: 30초) 설정해. 클라이언트 코드와 서버 라우트 코드를 모두 제공해 줘.

### **3.5. 반응형 리드 수집 폼 및 데이터베이스 보안 (Prompt 5\)**

마지막으로 챗봇 대화나 히어로 섹션 CTA를 통해 유도된 사용자의 정보를 안전하고 유려하게 수집하기 위한 폼(Form) 컴포넌트 아키텍처다. 사용자 기기의 화면 크기(useIsMobile 훅)에 따라 데스크탑 환경에서는 중앙 팝업 다이얼로그(Dialog)를, 모바일 환경에서는 하단에서 슬라이드 업 되는 드로어(Drawer)를 렌더링하는 반응형 래퍼 컴포넌트 기술을 적용한다5. 더욱 중요한 것은 데이터베이스 보안이다. 불특정 다수가 랜딩페이지에서 폼을 제출하는 익명 쓰기 환경이므로, Supabase의 RLS(Row Level Security) 정책을 활성화하고 INSERT 작업에 한해서만 anon 역할(Role)에 권한을 부여하는 세밀한 SQL 접근 제어가 수반되어야 한다21.

| 기술 요소 | 명세 및 요구사항 |
| :---- | :---- |
| **반응형 UI 래퍼** | shadcn/ui 기반, useIsMobile 훅을 사용해 Desktop: Dialog, Mobile: Drawer 렌더링 스위칭 |
| **폼 유효성 검사** | react-hook-form 및 zod 스키마 결합, 이름/연락처/이메일 필드 검증 |
| **Supabase 보안 (RLS)** | leads 테이블에 대해 anon 롤의 익명 쓰기(Insert)만 허용하고 읽기(Select)는 차단하는 SQL 정책 명시 |
| **사용자 피드백** | 제출 프로세스 간 로딩 스피너 구현 및 완료 시 토스트(Toast) 메시지 노출 |

# **Role & Task**

너는 데이터 보안과 폼 핸들링에 능숙한 시니어 프론트엔드 엔지니어야.  
Questionity의 파운딩 멤버 신청을 받는 리드(Leads) 수집 폼을 shadcn/ui의 Responsive Dialog/Drawer 기법을 활용해 구현하고, Supabase INSERT 로직을 작성해 줘.

# **Technical Specifications**

> 1. **Responsive Modal/Drawer (components/ui/ResponsiveLeadForm.tsx):**  
   * 커스텀 훅 useIsMobile을 감지하여 데스크탑에서는 shadcn의 Dialog 컴포넌트를 중앙에 띄우고, 모바일에서는 화면 하단에서 올라오는 Drawer 컴포넌트를 렌더링하는 반응형 래퍼 컴포넌트를 작성해.  
   * 폼 내부는 react-hook-form과 zod를 결합하여 이름, 연락처, 이메일, 관심 도서 분야에 대한 유효성 검사(Validation)를 수행해.  
> 2. **Supabase Database Insert (app/actions/submitLead.ts 또는 클라이언트 핸들러):**  
   * 유저가 폼을 제출하면 Supabase의 leads 테이블에 데이터를 insert 해.  
   * *중요 보안 사항:* 인증되지 않은 일반 유저(익명)가 랜딩페이지에서 폼을 제출하는 것이므로, Supabase RLS(Row Level Security) 설정 시 anon 역할에 대한 권한 부여가 필수적이야.  
   * SQL 관점에서 리드 수집용 RLS 정책을 어떻게 작성해야 하는지 주석으로 포함해 줘 (예: CREATE POLICY "Allow public inserts" ON leads FOR INSERT TO anon WITH CHECK (true);).  
> 3. **UX 개선:** 제출 버튼 클릭 시 로딩 스피너(disabled state)를 보여주고, 성공 시 sonner 패키지나 자체 Toast를 사용해 "파운딩 멤버 대기자로 등록되었습니다\!"라는 피드백을 주도록 해.

# **Output Format**

반응형 다이얼로그/드로어 래퍼 컴포넌트, Zod 스키마가 적용된 Form 컴포넌트, Supabase 제출 로직 및 RLS SQL 예시를 모두 묶어서 하나의 완성된 마크다운 결과물로 줘.

## **결론: 비즈니스 임팩트와 아키텍처의 종합**

본 Questionity MVP 랜딩페이지 기획안은 전통적인 정적 정보 전달 매체의 한계를 넘어, 고도화된 인터랙션과 AI 기술을 통해 사용자의 체류 시간과 전환율을 극대화하는 엔드투엔드(End-to-End) 아키텍처를 제시한다.  
Authentic Pre-launch라는 역발상 전략은 부족한 초기 데이터를 숨기기보다 가상임을 명시하여 투명성을 확보함으로써, 오히려 사용자가 서비스의 비전에 공감하고 참여하도록 유도한다. 이 과정에서 외부 공간 서비스인 'Work & Share'로의 원활한 브릿지 역할은 오프라인의 물리적 신뢰도를 디지털 커뮤니티로 차용해오는 영리한 수단으로 작용한다.  
무엇보다 Vercel AI SDK와 알라딘 Open API를 결합한 Proactive 챗봇 시스템은 단순한 CS 인프라가 아닌 능동적 세일즈 퍼널로서, 사용자의 심리(MBTI 타로)와 호기심(실시간 트렌드)을 자극하여 최종적으로 온디맨드 방 개설이라는 전환 목표로 매끄럽게 연결된다. 본 보고서에 명시된 아키텍처 설계와 5종의 바이브 코딩 프롬프트를 기반으로 구현을 진행한다면, 기획 의도에 완벽하게 부합하는 최고 수준의 MVP 프로덕트를 신속하게 시장에 선보일 수 있을 것이다.

#### **참고 자료**

> 1. 대학로 소극장 연극‧뮤지컬의 퍼스널 브랜딩 전략 \- 브랜드뉴스(BRAND NEWS), [https://www.ibrandnews.com/news/articleView.html?idxno=11859](https://www.ibrandnews.com/news/articleView.html?idxno=11859)  
> 2. Next.js AI Chatbot Templates & Starters \- Vercel, [https://vercel.com/templates/next.js/chatbot](https://vercel.com/templates/next.js/chatbot)  
> 3. \[Android/Kotlin\] 알라딘 API 연동, [https://naahy0co.tistory.com/32](https://naahy0co.tistory.com/32)  
> 4. sujayxaradhya/marquee-framer \- GitHub, [https://github.com/sujayxaradhya/marquee-framer](https://github.com/sujayxaradhya/marquee-framer)  
> 5. A Responsive Dialog System | John Paul Blog, [https://johnpaulweb.dev/blog/responsive-dialog-system](https://johnpaulweb.dev/blog/responsive-dialog-system)  
> 6. Tailwind CSS Bento Grids \- Official Tailwind UI Components, [https://tailwindcss.com/plus/ui-blocks/marketing/sections/bento-grids](https://tailwindcss.com/plus/ui-blocks/marketing/sections/bento-grids)  
> 7. How to create infinite scrolling carousel in React with Framer Motion? \- Stack Overflow, [https://stackoverflow.com/questions/79633049/how-to-create-infinite-scrolling-carousel-in-react-with-framer-motion](https://stackoverflow.com/questions/79633049/how-to-create-infinite-scrolling-carousel-in-react-with-framer-motion)  
> 8. Build a React Marquee Component with Tailwind CSS | Step-by-Step Guide \- Ezier.co, [https://www.ezier.co/blog/building-highly-customizable-css-only-marquees](https://www.ezier.co/blog/building-highly-customizable-css-only-marquees)  
> 9. How to use OpenAI Function Calling with Next.js and the Vercel AI SDK, [https://vercel.com/kb/guide/openai-function-calling](https://vercel.com/kb/guide/openai-function-calling)  
> 10. Streaming AI Responses with the Vercel AI SDK \- Hasan Iqbal, [https://www.hasaniqbal.com/blog/streaming-ai-responses-with-vercel-ai-sdk/](https://www.hasaniqbal.com/blog/streaming-ai-responses-with-vercel-ai-sdk/)  
> 11. Chatbot \- AI SDK UI, [https://ai-sdk.dev/v5/docs/ai-sdk-ui/chatbot](https://ai-sdk.dev/v5/docs/ai-sdk-ui/chatbot)  
> 12. 알라딘 도서 검색 API의 활용사례(feat. 북적북적) \- many zero, [https://manymanyzero.tistory.com/35](https://manymanyzero.tistory.com/35)  
> 13. 알라딘 OPEN API 사용법 \- velog, [https://velog.io/@jjuny0406/%EC%95%8C%EB%9D%BC%EB%94%98-OPEN-API-%EC%82%AC%EC%9A%A9%EB%B2%95](https://velog.io/@jjuny0406/%EC%95%8C%EB%9D%BC%EB%94%98-OPEN-API-%EC%82%AC%EC%9A%A9%EB%B2%95)  
> 14. Getting Started: Next.js App Router \- AI SDK, [https://ai-sdk.dev/v4/docs/getting-started/nextjs-app-router](https://ai-sdk.dev/v4/docs/getting-started/nextjs-app-router)  
> 15. Chatbot Tool Usage \- AI SDK UI, [https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage](https://ai-sdk.dev/docs/ai-sdk-ui/chatbot-tool-usage)  
> 16. \[OpenAPI님의 서재\] : 알라딘, [https://blog.aladin.co.kr/mobile/mredirection.aspx?SM=PC\&returnurl=%2Fopenapi](https://blog.aladin.co.kr/mobile/mredirection.aspx?SM=PC&returnurl=/openapi)  
> 17. \[알라딘서재\]상품API 안내, [https://blog.aladin.co.kr/openapi/popup/5353294](https://blog.aladin.co.kr/openapi/popup/5353294)  
> 18. Generative UI without generating text \- AI SDK \- Vercel Community, [https://community.vercel.com/t/generative-ui-without-generating-text/6062](https://community.vercel.com/t/generative-ui-without-generating-text/6062)  
> 19. Getting Started: Next.js App Router \- AI SDK, [https://ai-sdk.dev/docs/getting-started/nextjs-app-router](https://ai-sdk.dev/docs/getting-started/nextjs-app-router)  
> 20. Drawer \- Shadcn UI, [https://ui.shadcn.com/docs/components/base/drawer](https://ui.shadcn.com/docs/components/base/drawer)  
> 21. Row Level Security | Supabase Docs, [https://supabase.com/docs/guides/database/postgres/row-level-security](https://supabase.com/docs/guides/database/postgres/row-level-security)  
> 22. Lock Down Your Data: Implement Row-Level Security Policies in Supabase SQL, [https://dev.to/thebenforce/lock-down-your-data-implement-row-level-security-policies-in-supabase-sql-4p82](https://dev.to/thebenforce/lock-down-your-data-implement-row-level-security-policies-in-supabase-sql-4p82)