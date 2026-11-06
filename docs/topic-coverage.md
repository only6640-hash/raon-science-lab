# 전기·전자 주제별 구현 목록

각 ID는 고정된 학습 주제입니다. 공통 엔진을 사용하더라도 관찰 대상과 질문을 해당 주제에 맞추었습니다. 원본 기능의 완전 복제를 주장하지 않습니다.

| ID | 목록 주제 | 구현 모형 | 파일 | 조작·탐구 |
|---|---|---|---|---|
| 1 | [직렬, 병렬 회로에 걸리는 전압 / 직렬, 병렬 회로에 흐르는 전류](https://javalab.org/ko/electric_potential/) | 직렬·병렬의 전압과 전류 | circuits.js | 전원 전압 · 저항 R₁ · 저항 R₂ · 연결 · 전체 스위치 |
| 2 | [자석(or 지구) 주위의 자기장](https://javalab.org/ko/magnet/) | 자석과 지구의 자기장 | magnetic.js | 지구 모형 (0: 자석, 1: 지구) · 관측점 각도 · 중심에서의 상대 거리 |
| 3 | [전자기력, 로렌츠 힘](https://javalab.org/ko/lorentzs_force/) | 전류가 흐르는 도선의 로렌츠 힘 | magnetic.js | 도선 전류 (＋: 화살표 방향) · 오른쪽 자기장 · 자기장 속 도선 길이 · ＋전류 방향과 오른쪽 사이 각 |
| 4 | [자석과 전자석](https://javalab.org/ko/magnet_and_electromagnet/) | 자석과 전자석 | magnetic.js | 솔레노이드 전류 · 감은 수 · 솔레노이드 길이 |
| 5 | [패러데이의 전자기 유도 법칙 2](https://javalab.org/ko/faradays_law_2/) | 움직이는 자석과 전자기 유도 | magnetic.js | 코일 중심에서 자석 위치 · 자석의 순간 속도 · 코일 감은 수 · 자석 극 뒤집기 |
| 6 | [코일 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_coil/) | 코일 주위의 자기장 | magnetic.js | 전류 · 감은 수 · 반지름 · 축 위 거리 |
| 7 | [패러데이의 전자기 유도 법칙](https://javalab.org/ko/faradays_law/) | 움직이는 자석과 패러데이 법칙 | magnetic.js | 코일 중심 기준 자석 위치 · 자석 속도 (＋: 오른쪽) · 감은 수 · 자석 세기 · 극 뒤집기 |
| 8 | [커패시터의 충전・방전 특성](https://javalab.org/ko/capacitor_characteristic/) | 커패시터의 충전·방전 | electronics.js | 저항 · 전기 용량 · 측정 시각 · 스위치 · 전압계 연결 · 추가 조작 패널 |
| 9 | [논리 회로(Logic Gate)](https://javalab.org/ko/logic/) | 논리 회로 · 입력에서 출력까지 | electronics.js | 게이트 · 입력 A · 입력 B |
| 10 | [전기 회로 시뮬레이터 (전기 회로 가상 실험)](https://javalab.org/ko/electric_circuits/) | 전기 회로 공방 · 자유 배선 | circuit-editor.js | 전원 전압 · 추가 조작 패널 |
| 11 | [마이크와 스피커](https://javalab.org/ko/speaker/) | 마이크와 스피커 · 에너지의 왕복 | electronics.js | 변환 방향 · 진동 세기 · 표시 진동수 · 자기장 · 추가 조작 패널 |
| 12 | [축전기 속의 유전체](https://javalab.org/ko/dielectric_in_capacitor/) | 유전체로 전하를 더 저장하기 | electrostatic.js | 극판 면적 · 극판 간격 · 기준 전압 · 유전율 εᵣ · 전원 연결 |
| 13 | [정전식 터치스크린](https://javalab.org/ko/touch_screen/) | 손가락이 만드는 정전용량 변화 | electrostatic.js | 손가락 가로 위치 · 손가락 세로 위치 · 표면 위 거리 |
| 14 | [직렬 회로와 병렬 회로 3](https://javalab.org/ko/serial_parallel_circuit_3/) | 직렬·병렬: 전압 분배 탐구 | circuits.js | 전원 전압 · 저항 R₁ · 저항 R₂ · 연결 · 전체 스위치 |
| 15 | [다이오드](https://javalab.org/ko/diode/) | 다이오드 · 한 방향 전류 | electronics.js | 접합 전압 |
| 16 | [AM, FM 라디오의 변조](https://javalab.org/ko/am_fm/) | AM·FM 변조 · 어디에 정보를 담을까? | electronics.js | 변조 방식 · 변조 지수 · 반송파 / 신호 주파수비 |
| 17 | [인덕터 응용 회로](https://javalab.org/ko/inductor/) | 인덕터 응용 · 세 가지 LED 스위칭 | electronics.js | 응용 회로 · 인덕턴스 · 저항 · 동작 후 시간 |
| 18 | [직렬 회로와 병렬 회로](https://javalab.org/ko/serial_parallel_circuit/) | 직렬·병렬 전구의 밝기 | circuits.js | 전원 전압 · 저항 R₁ · 저항 R₂ · 연결 · 전체 스위치 · 전구 1 소켓 · 전구 2 소켓 |
| 19 | [정전기 유도](https://javalab.org/ko/electrostatic_induction/) | 대전체가 만드는 정전기 유도 | electrostatic.js | 대전체 극성 · 대전체와 거리 · 관찰 물질 |
| 20 | [원형 도선 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_circular_wire/) | 원형 도선의 자기장 | magnetic.js | 전류 · 반지름 · 축 위 거리 |
| 21 | [옴의 법칙](https://javalab.org/ko/ohms_law/) | 옴의 법칙: 전압–전류 그래프 | circuits.js | 전원 전압 · 저항 |
| 22 | [RLC 직렬 회로](https://javalab.org/ko/rlc_serial_circuit/) | RLC 직렬 회로 · 공진과 위상 | electronics.js | 저항 · 인덕턴스 · 전기 용량 · 교류 주파수 |
| 23 | [축전기](https://javalab.org/ko/capacitor/) | 축전기의 면적과 간격 | electrostatic.js | 극판 면적 · 극판 간격 · 기준 전압 |
| 24 | [직류와 교류](https://javalab.org/ko/dc_and_ac/) | 직류와 교류 · 방향이 바뀌는 전류 | electronics.js | 전원 · 직류값 / 교류 진폭 · 교류 주파수 |
| 25 | [만약 물 분자가 직선형 구조라면?](https://javalab.org/ko/polarity_of_water/) | 물 분자가 직선이라면? | electrostatic.js | H–O–H 결합각 · 결합 쌍극자 크기 |
| 26 | [얇은 도체 표면의 전하 분포](https://javalab.org/ko/charge_distribution_on_a_thin_conductive_plate/) | 얇은 원판의 가장자리 전하 | electrostatic.js | 원판 반지름 · 전체 전하량 · 중심에서 탐침 위치 |
| 27 | [막대자석 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_bar_magnet/) | 막대자석의 자기력선 | magnetic.js | 극 뒤집기 · 자기 모멘트 · 축 위 관측 거리 |
| 28 | [빈 깡통으로 하는 정전기 실험 시뮬레이션](https://javalab.org/ko/static_electricity_can/) | 대전된 막대가 깡통을 굴리는 이유 | electrostatic.js | 막대 극성 · 막대 위치 · 대전 정도 · 구름 저항 |
| 29 | [코일 주위의 자기장 (WEBGL 버전)](https://javalab.org/ko/oersteds_3d/) | 코일의 입체 자기장 | magnetic.js | 전류 · 감은 수 · 반지름 · 시점 회전 |
| 30 | [태양풍과 오로라](https://javalab.org/ko/solar_wind/) | 태양풍과 지구 자기권 | magnetic.js | 태양풍 양성자 밀도 · 태양풍 속력 · 지구 자기축 기울기 |
| 31 | [스텝-다운, 스텝-업 레귤레이터 회로의 기본 원리 (DC-DC 컨버터, 직류 변압기)](https://javalab.org/ko/step_response/) | DC–DC 컨버터 · 스위칭으로 전압 바꾸기 | electronics.js | 변환기 · 입력 전압 · 듀티비 |
| 32 | [마이크로비트 축전기(커패시터)의 충·방전 곡선 관찰 / 충전 시간 측정](https://javalab.org/ko/microbit_capacitor/) | 마이크로비트로 읽는 충전 곡선 | electronics.js | 저항 · 전기 용량 · 측정 시각 · 스위치 |
| 33 | [강자성체의 자화](https://javalab.org/ko/magnetization/) | 강자성체의 자화와 잔류 자화 | magnetic.js | 자화에 사용한 외부장 · 이력 단계 (0: 처음, 1: 자화, 2: 장 제거) · 재료 (0: 연자성, 1: 경자성) |
| 34 | [자기력](https://javalab.org/ko/magnetic_force/) | 두 자석 사이의 자기력 | magnetic.js | 마주 보는 극 (0: 다른 극, 1: 같은 극) · 중심 사이 거리 · 각 자석의 자기 모멘트 |
| 35 | [같은 회로](https://javalab.org/ko/same_circuit/) | 같은 회로 찾기: 모양보다 접점 | circuits.js | 전압 · 저항 R₁ · 저항 R₂ · 회로 연결 |
| 36 | [외르스테드의 실험](https://javalab.org/ko/oersteds_experiment/) | 외르스테드의 나침반 | magnetic.js | 전류 (＋: 화면 밖) · 도선과 나침반 거리 · 지구 수평 자기장 |
| 37 | [건물의 배선](https://javalab.org/ko/home_wiring/) | 건물의 배선 · 빠진 공급선 연결하기 | circuit-editor.js | 전원 전압 · 추가 조작 패널 |
| 38 | [백열전구(저항의 열작용)](https://javalab.org/ko/incandescence/) | 백열전구: 뜨거워지는 필라멘트 | circuits.js | 전구 전압 · 실온 저항 |
| 39 | [커패시터 응용 회로](https://javalab.org/ko/capacitor_application/) | 커패시터 응용 · 순간 점등과 지연 스위치 | electronics.js | 응용 회로 · 스위치 동작 · 저항 · 전기 용량 · 동작 후 시간 |
| 40 | [축전기 2](https://javalab.org/ko/capacitor_2/) | 축전기의 전하와 에너지 | electrostatic.js | 극판 면적 · 극판 간격 · 기준 전압 · 유전율 εᵣ · 전원 연결 |
| 41 | [전류, 전도체, 부도체](https://javalab.org/ko/electric_current/) | 전도체 안에서 흐르는 전류 | electrostatic.js | 재료 · 양단 전압 · 시료 길이 · 단면적 |
| 42 | [마찰전기](https://javalab.org/ko/triboelectricity/) | 문지른 풍선은 왜 벽에 붙을까요? | electrostatic.js | 관찰 장면 · 문지른 정도 · 습도 · 문지른 뒤 경과 시간 |
| 43 | [전기 회로 시뮬레이터(AC)](https://javalab.org/ko/electric_circuits_ac/) | 교류 회로 공방 · 자유 배선 | circuit-editor.js | 전원 실효 전압 · 교류 주파수 · 추가 조작 패널 |
| 44 | [높은 전압으로 송전하는 이유](https://javalab.org/ko/power_transmission/) | 높은 전압으로 송전하는 이유 | circuits.js | 수신 전압 · 수신 전력 · 왕복 송전선 저항 |
| 45 | [감압식(저항막) 터치스크린](https://javalab.org/ko/resistive_touch_screen/) | 압력으로 좌표를 읽는 터치스크린 | electrostatic.js | 가로 터치 위치 · 세로 터치 위치 · 누르는 정도 · 기준 전압 |
| 46 | [트랜지스터 응용 회로](https://javalab.org/ko/transistor_2/) | 트랜지스터 응용 · 어두우면 켜지는 등 | electronics.js | 주변 밝기 · 점등 감도 |
| 47 | [LED의 원리](https://javalab.org/ko/led/) | LED · 전자의 에너지가 빛으로 | electronics.js | 밴드갭 · 주입 전류 |
| 48 | [직류 전동기](https://javalab.org/ko/dc_motor/) | 직류 전동기의 회전력 | magnetic.js | 공급 전류 · 자기장 · 감은 수 · 회전자 각도 |
| 49 | [호모폴라 전동기](https://javalab.org/ko/homopolar_motor/) | 전지·자석·도선 호모폴라 전동기 | magnetic.js | 전지 전류 (＋: 위 단자에서 도선으로) · 아래 도선 구간의 위쪽 자기장 · 도선 바깥 반지름 · 접촉 (0: 끊김, 1: 연결) |
| 50 | [변압기](https://javalab.org/ko/electric_transformer/) | 변압기: 전압과 전류의 맞교환 | magnetic.js | 1차 교류 전압 · 1차 감은 수 · 2차 감은 수 · 2차 부하 저항 · 전원 (0: 교류, 1: 정상 직류) |
| 51 | [직렬 회로와 병렬 회로 2](https://javalab.org/ko/serial_parallel_circuit_2/) | 전구를 하나 빼면? | circuits.js | 전원 전압 · 저항 R₁ · 저항 R₂ · 연결 · 전체 스위치 · 전구 1 소켓 · 전구 2 소켓 |
| 52 | [LC 필터](https://javalab.org/ko/lc_filter/) | LC 필터 · 저역·고역·대역 통과 | electronics.js | 필터 종류 · 인덕턴스 · 전기 용량 · 부하 저항 · 입력 주파수 |
| 53 | [병렬 회로의 이해](https://javalab.org/ko/parallel_circuit/) | 병렬 회로의 이해 | circuits.js | 전원 전압 · 저항 R₁ · 저항 R₂ · 전체 스위치 |
| 54 | [검전기](https://javalab.org/ko/electroscope/) | 검전기의 전하와 금속박 | electrostatic.js | 검전기 전체 전하 · 막대 대전 정도 · 막대 극성 · 막대와 거리 |
| 55 | [전위차 3](https://javalab.org/ko/electric_potential_3/) | 회로의 두 점 사이 전압 재기 | electrostatic.js | 전원 전압 · 저항 R₁ · 저항 R₂ · 도선 상태 · 빨간 단자 (+) · 검은 단자 (−) |
| 56 | [전위차 2](https://javalab.org/ko/electric_potential_2/) | 직렬·병렬 회로의 전위 높이 | electrostatic.js | 연결 방법 · 전원 전압 · 저항 R₁ · 저항 R₂ · 빨간 단자 (+) · 검은 단자 (−) |
| 57 | [휘트스톤 브리지](https://javalab.org/ko/wheatstone_bridge/) | 휘트스톤 브리지의 평형 | circuits.js | 전원 · 저항 R1 · 저항 R2 · 저항 R3 · 저항 R4 |
| 58 | [7-세그먼트 디스플레이](https://javalab.org/ko/fnd/) | 7-세그먼트 · 숫자를 빛의 코드로 | electronics.js | 표시 숫자 · 연결 방식 |
| 59 | [전파 통신](https://javalab.org/ko/radio_wave_communication/) | 전파 통신 · 안테나에서 안테나로 | electronics.js | 전송 거리 · 잡음 세기 · 수신 증폭 |
| 60 | [계단 스위치](https://javalab.org/ko/stairbulb/) | 계단 스위치: 두 곳에서 전등 켜기 | circuits.js | 아래층 스위치 · 위층 스위치 · 모형 전압 · 전등 등가 저항 |
| 61 | [철과 알루미늄의 분리](https://javalab.org/ko/separation_of_iron_and_aluminum/) | 자석 롤러로 철과 알루미늄 분리 | magnetic.js | 끝 롤러 자석 (0: 끔, 1: 켬) · 운반 과정 |
| 62 | [인덕터와 커패시터](https://javalab.org/ko/inductor_and_capacitor/) | 인덕터와 커패시터 · 연결 직후와 충분한 시간 뒤 | electronics.js | 공통 저항 · 인덕턴스 · 전기 용량 · 연결 후 시간 |
| 63 | [전자기파의 종류](https://javalab.org/ko/electromagnetic_waves/) | 전자기파 스펙트럼 · 하나의 파동, 다양한 크기 | electronics.js | 주파수 log₁₀(f/Hz) |
| 64 | [음극선관](https://javalab.org/ko/crt/) | 음극선관 · 직진·그림자·전기장·자기장 | electronics.js | 관찰 모드 · 가속 전압 · 편향 전압 · 자기장 · 화면 밖 양수 · 장애물 세로 위치 |
| 65 | [교류 발전기](https://javalab.org/ko/ac_generator/) | 회전 코일 교류 발전기 | magnetic.js | 자기장 · 감은 수 · 코일 면적 · 회전 진동수 · 초기 위상 |
| 66 | [반가산기(Half Adder)](https://javalab.org/ko/half_adder/) | 반가산기 · 두 비트의 덧셈 | electronics.js | 입력 A · 입력 B |
| 67 | [직류 전동기 2](https://javalab.org/ko/dc_motor_2/) | 직류 전동기와 정류자 | magnetic.js | 공급 전류 · 자기장 · 감은 수 · 회전자 각도 · 분할 정류자 사용 |
| 68 | [전자기력(전기 그네)](https://javalab.org/ko/lorentzs_force_3d/) | 전자기력으로 기울어지는 전기 그네 | magnetic.js | 도선 전류 (＋: 화면 밖) · 아래쪽 자기장 · 자기장 속 도선 길이 · 그네 질량 |
| 69 | [전기력선](https://javalab.org/ko/electric_field_line/) | 두 점전하의 전기력선 | electrostatic.js | 왼쪽 전하 · 오른쪽 전하 · 전하 사이 거리 · 탐침 가로 위치 · 탐침 세로 위치 |
| 70 | [전류계의 구조](https://javalab.org/ko/ammeter/) | 전류계: 회전력과 복원력 | magnetic.js | 측정 전류 · 코일 감은 수 · 방사형 자기장 · 비틀림 용수철 상수 |
| 71 | [정류 회로](https://javalab.org/ko/rectifier_circuit/) | 정류 회로 · 교류를 한 방향으로 | electronics.js | 정류 방식 · 평활 용량 · 부하 저항 · 다이오드 1개 전압 강하 |
| 72 | [전하량 보존 법칙](https://javalab.org/ko/charge_conservation/) | 전구를 지나도 전하는 줄지 않습니다 | electrostatic.js | 전구 연결 · 전원 전압 · 전구 1의 저항 · 전구 2의 저항 · 통과 전하 관찰 시간 |
| 73 | [금속 결합 관점에서 본 정전기 유도](https://javalab.org/ko/electrostatic_induction_metal_bonding/) | 금속 격자 사이의 자유전자 | electrostatic.js | 대전체 극성 · 대전체와 거리 |
| 74 | [도체와 부도체의 정전기 유도](https://javalab.org/ko/conductor_and_insulator/) | 도체와 부도체의 반응 비교 | electrostatic.js | 대전체 극성 · 대전체와 거리 |
| 75 | [전선 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_wire/) | 직선 전선 주위의 자기장 | magnetic.js | 전류 (＋: 화면 밖) · 관측 거리 · 나침반 위치 각도 · 북쪽 지구 자기장 |
| 76 | [LC 진동 회로](https://javalab.org/ko/lc_oscillator/) | LC 진동 · 전기장과 자기장의 에너지 교환 | electronics.js | 인덕턴스 · 전기 용량 · 진동 위상 |
| 77 | [트랜지스터의 원리](https://javalab.org/ko/transistor/) | 트랜지스터 · 작은 전류로 큰 전류 제어 | electronics.js | 베이스 전류 · 전류 이득 β |
| 78 | [금속의 에너지 띠(밴드)](https://javalab.org/ko/energy_band/) | 원자 준위에서 에너지 띠로 | electrostatic.js | 관찰 모드 · 원자 수 (형성 모드) · 원자 사이 거리 (형성 모드) · 재료 (비교 모드) · 온도 (비교 모드) · 띠틈 (비교 모드·반도체) |
| 79 | [인덕터와 커패시터 3](https://javalab.org/ko/inductor_and_capacitor_3/) | 인덕터와 커패시터 3 · 교류의 크기와 위상 | electronics.js | 교류 소자 · 인덕턴스 · 전기 용량 · 교류 주파수 · 전압 RMS · 관찰 위상 |
| 80 | [인덕터와 커패시터 2](https://javalab.org/ko/inductor_and_capacitor_2/) | 인덕터와 커패시터 2 · 저장과 되돌려주기 | electronics.js | 교류 소자 · 인덕턴스 · 전기 용량 · 교류 주파수 · 전압 RMS · 관찰 위상 |
| 81 | [자석은 왜 못을 끌어 당길까?](https://javalab.org/ko/magnetic_induction/) | 자석이 철 못을 끌어당기는 이유 | magnetic.js | 자석과 못 사이 간격 · 자석 극 뒤집기 · 재료 (0: 철, 1: 비자성체) · 관찰 (0: 한 개의 못, 1: 못 사슬) · 사슬에서 제거할 못 (0: 없음) |
| 82 | [전자기파의 방출](https://javalab.org/ko/electromagnetic_wave/) | 전자기파의 방출 · 가속하는 전하 | electronics.js | 진동 진폭 · 표시 진동수 |
| 83 | [다이오드 만들기](https://javalab.org/ko/diode_making/) | 다이오드 만들기 · P형과 N형을 접합하다 | electronics.js | 상대 도핑 농도 · 제작 단계 |
