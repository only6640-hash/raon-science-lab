# 전기·전자 주제별 현재 구현

원본의 교육적 공간 관계를 관찰하여 독립적으로 그린 구현입니다. 이 목록은 등록된 기능 목록이며, 원본과의 완전한 동작 일치나 모든 기기의 검증을 뜻하지 않습니다. 구체적인 확인 범위는 각 수업의 안내와 분야별 검증 문서를 참고하세요.

| ID | 주제 | 최종 구현 파일 | 조작 | 참고 화면 확인 상태 |
|---|---|---|---|---|
| 1 | [직렬, 병렬 회로에 걸리는 전압 / 직렬, 병렬 회로에 흐르는 전류](https://javalab.org/ko/electric_potential/) | circuits.js | 회로 선택 · 전원 전압 · 기준 저항 R₁ · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 2 | [자석(or 지구) 주위의 자기장](https://javalab.org/ko/magnet/) | layout-magnetic.js | 자기장 표시 | static-reference-only |
| 3 | [전자기력, 로렌츠 힘](https://javalab.org/ko/lorentzs_force/) | layout-magnetic.js | 관찰 · 자석 극 반전 · 전류 반전 · 자기장 표시 | observed-spatial-layout |
| 4 | [자석과 전자석](https://javalab.org/ko/magnet_and_electromagnet/) | layout-magnetic.js | 나침반 행렬 · 자기력선 · 그림 위 직접 조작 | observed-spatial-layout |
| 5 | [패러데이의 전자기 유도 법칙 2](https://javalab.org/ko/faradays_law_2/) | layout-magnetic.js | 코일 감기 · 자석 극 반전 · 실행 · 격자에 맞추기 · 관찰 시각 · 그림 위 직접 조작 | observed-spatial-layout |
| 6 | [코일 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_coil/) | layout-magnetic.js | 전류 방향 전환 · 감은 방향 전환 · 표시 · 오른손의 법칙 · 전류 표시 | observed-spatial-layout |
| 7 | [패러데이의 전자기 유도 법칙](https://javalab.org/ko/faradays_law/) | layout-magnetic.js | 자석 왕복 운동 · 자석 회전 운동 · 코일 감기 · 관찰 장치 · 자기장 표시 · 유도 전류 표시 | observed-spatial-layout |
| 8 | [커패시터의 충전・방전 특성](https://javalab.org/ko/capacitor_characteristic/) | layout-electronics.js | 전원 전압 · 저항 · 전기 용량 · 측정 시각 · 수동 조절 · 스위치 · 커패시터 연결 · 프로브 연결 · 그림 위 직접 조작 | observed |
| 9 | [논리 회로(Logic Gate)](https://javalab.org/ko/logic/) | layout-electronics.js | 입력 A · 입력 B · 회로 표현 · 전류 · 그림 위 직접 조작 | observed |
| 10 | [전기 회로 시뮬레이터 (전기 회로 가상 실험)](https://javalab.org/ko/electric_circuits/) | layout-workbench.js | 전하 이동 표시 · 전지 1개의 내부 저항 · 이름·값 표시 · 소비 전력 표시 · 전구 빛줄기 · 위치 격자 맞춤 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 11 | [마이크와 스피커](https://javalab.org/ko/speaker/) | layout-electronics.js | 연결 스위치 · 진동 세기 · 표시 진동수 · 자기장 · 그림 위 직접 조작 | observed |
| 12 | [축전기 속의 유전체](https://javalab.org/ko/dielectric_in_capacitor/) | layout-electrostatic.js | 극판 너비 · 극판 간격 · 전기장 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 13 | [정전식 터치스크린](https://javalab.org/ko/touch_screen/) | layout-electrostatic.js | 터치 센서 방식 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 14 | [직렬 회로와 병렬 회로 3](https://javalab.org/ko/serial_parallel_circuit_3/) | layout-circuits.js | 왼쪽 직렬 저항 추가 · 오른쪽 병렬 저항 추가 · 움직임 표시 · 전압 · 각 저항 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 15 | [다이오드](https://javalab.org/ko/diode/) | layout-electronics.js | 바이어스 · 접합 전압 크기 · 접합 확대 · 그림 위 직접 조작 | observed |
| 16 | [AM, FM 라디오의 변조](https://javalab.org/ko/am_fm/) | layout-electronics.js | AM 표시 · FM 표시 · 변조 지수 · 반송파 / 신호 주파수비 · 그림 위 직접 조작 | observed |
| 17 | [인덕터 응용 회로](https://javalab.org/ko/inductor/) | layout-transients.js | 관찰 속도 · 인덕턴스 · 저항 · 실행 · 1번 회로 스위치 · 2번 회로 스위치 · 3번 회로 스위치 · 4번 회로 스위치 · 그림 위 직접 조작 | observed |
| 18 | [직렬 회로와 병렬 회로](https://javalab.org/ko/serial_parallel_circuit/) | layout-circuits.js | 전구 저항 비 · 그림에 계산값 표시 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 19 | [정전기 유도](https://javalab.org/ko/electrostatic_induction/) | layout-electrostatic.js | 막대의 대전 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 20 | [원형 도선 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_circular_wire/) | layout-magnetic.js | 전류 방향 전환 · 도선 위치 표시 · 오른손의 법칙 | observed-spatial-layout |
| 21 | [옴의 법칙](https://javalab.org/ko/ohms_law/) | layout-circuits.js | 전지 수 · 저항 | 분야별 검증 문서 참조 |
| 22 | [RLC 직렬 회로](https://javalab.org/ko/rlc_serial_circuit/) | layout-electronics.js | 저항 · 인덕턴스 · 전기 용량 · 교류 주파수 · 위상 벡터 합치기 · 파형 · 식 · 그림 위 직접 조작 | observed |
| 23 | [축전기](https://javalab.org/ko/capacitor/) | layout-electrostatic.js | 그림 조작 | observed-layout-restored |
| 24 | [직류와 교류](https://javalab.org/ko/dc_and_ac/) | layout-electronics.js | DC 스위치 · AC 스위치 · 전압 크기 · 표시 교류 진동수 · 그림 위 직접 조작 | observed |
| 25 | [만약 물 분자가 직선형 구조라면?](https://javalab.org/ko/polarity_of_water/) | layout-electrostatic.js | 대전체 상태 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 26 | [얇은 도체 표면의 전하 분포](https://javalab.org/ko/charge_distribution_on_a_thin_conductive_plate/) | layout-electrostatic.js | 도체판 모양 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 27 | [막대자석 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_bar_magnet/) | layout-magnetic.js | 자기장 표시 · 극 뒤집기 | observed-spatial-layout |
| 28 | [빈 깡통으로 하는 정전기 실험 시뮬레이션](https://javalab.org/ko/static_electricity_can/) | layout-can.js | 원리 탐구: 막대의 대전 · 원리 탐구: 대전 정도 · 전하 분포 · 구름 운동 · 그림 위 직접 조작 | static-layout-article-supported-interaction |
| 29 | [코일 주위의 자기장 (WEBGL 버전)](https://javalab.org/ko/oersteds_3d/) | layout-magnetic.js | 원리 탐구: 전류 반전 · 오른손 표시 | static-reference-only |
| 30 | [태양풍과 오로라](https://javalab.org/ko/solar_wind/) | layout-magnetic.js | CME 세기 · 지구 자기장 · 지구를 자석으로 보기 | observed-spatial-layout |
| 31 | [스텝-다운, 스텝-업 레귤레이터 회로의 기본 원리 (DC-DC 컨버터, 직류 변압기)](https://javalab.org/ko/step_response/) | layout-electronics.js | 스위칭 진동수 · 0은 수동 · 입력 전압 · 자동 스위치 듀티비 · 실행 · 출력 커패시터 추가 · 강압 수동 스위치 · 승압 수동 스위치 · 반전 수동 스위치 · 그림 위 직접 조작 | observed |
| 32 | [마이크로비트 축전기(커패시터)의 충·방전 곡선 관찰 / 충전 시간 측정](https://javalab.org/ko/microbit_capacitor/) | layout-electronics.js | 저항 · 전기 용량 · 측정 시각 · 스위치 · 표시 시간창 · 그림 위 직접 조작 | hardware-preview-only |
| 33 | [강자성체의 자화](https://javalab.org/ko/magnetization/) | layout-magnetic.js | 자석의 방향 · 불 붙이기 · 그림 위 직접 조작 | observed-spatial-layout |
| 34 | [자기력](https://javalab.org/ko/magnetic_force/) | layout-magnetic.js | 나침반 행렬 · 자기력선 · 그림 위 직접 조작 | observed-spatial-layout |
| 35 | [같은 회로](https://javalab.org/ko/same_circuit/) | layout-circuits.js | 회로 변형 · 자동 변형 · 전압 · 저항 R₁ · 저항 R₂ | 분야별 검증 문서 참조 |
| 36 | [외르스테드의 실험](https://javalab.org/ko/oersteds_experiment/) | layout-magnetic.js | 나침반의 위치 · 전지의 방향 · 흐름 표시 | observed-spatial-layout |
| 37 | [건물의 배선](https://javalab.org/ko/home_wiring/) | layout-workbench.js | 전하 이동 표시 · 이름·값 표시 · 위치 격자 맞춤 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 38 | [백열전구(저항의 열작용)](https://javalab.org/ko/incandescence/) | layout-circuits.js | 스위치 | 분야별 검증 문서 참조 |
| 39 | [커패시터 응용 회로](https://javalab.org/ko/capacitor_application/) | layout-transients.js | 저항 · 전기 용량 · 실행 · 왼쪽 순간 스위치 · 가운데 충전 스위치 · 가운데 방전 스위치 · 오른쪽 순간 스위치 · 그림 위 직접 조작 | observed |
| 40 | [축전기 2](https://javalab.org/ko/capacitor_2/) | layout-electrostatic.js | 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 41 | [전류, 전도체, 부도체](https://javalab.org/ko/electric_current/) | layout-electrostatic.js | 전지 1 · 전지 2 · 전지 3 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 42 | [마찰전기](https://javalab.org/ko/triboelectricity/) | layout-electrostatic.js | 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 43 | [전기 회로 시뮬레이터(AC)](https://javalab.org/ko/electric_circuits_ac/) | layout-workbench.js | 전하 이동 표시 · 콘센트 전압 (RMS) · 콘센트 모양 · 저항값 표시 · 소비 전력 표시 · 위치 격자 맞춤 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 44 | [높은 전압으로 송전하는 이유](https://javalab.org/ko/power_transmission/) | layout-circuits.js | 위 경로 송전 전압 · 위 경로 송전 저항 · 아래 경로 송전 전압 · 아래 경로 송전 저항 | 분야별 검증 문서 참조 |
| 45 | [감압식(저항막) 터치스크린](https://javalab.org/ko/resistive_touch_screen/) | layout-electrostatic.js | 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 46 | [트랜지스터 응용 회로](https://javalab.org/ko/transistor_2/) | layout-electronics.js | 비교 회로 펼치기 · 직접 스위치 · 트랜지스터 베이스 스위치 · 반전 베이스 접지 스위치 · 전류 · 그림 위 직접 조작 | partial-observed |
| 47 | [LED의 원리](https://javalab.org/ko/led/) | layout-electronics.js | 바이어스 · 밴드갭 · 접합 확대 · 그림 위 직접 조작 | observed |
| 48 | [직류 전동기](https://javalab.org/ko/dc_motor/) | layout-magnetic.js | 원리 탐구: 회전 · 원리 탐구: 자기장 · 원리 탐구: 전류 · 원리 탐구: 힘 · 원리 탐구: 회전자 각도 · 전원 방향 반전 | static-reference-only |
| 49 | [호모폴라 전동기](https://javalab.org/ko/homopolar_motor/) | layout-magnetic.js | 원리 탐구: 전지 반전 · 원리 탐구: 자기장 · 원리 탐구: 전류 · 원리 탐구: 힘 · 회전 실행 · 전류의 세기 | static-reference-only |
| 50 | [변압기](https://javalab.org/ko/electric_transformer/) | layout-magnetic.js | 실행 · 부하 연결 · 2차 코일 위상 · 2차/1차 감은 수 비 | observed-spatial-layout |
| 51 | [직렬 회로와 병렬 회로 2](https://javalab.org/ko/serial_parallel_circuit_2/) | layout-circuits.js | 위쪽 전구 수 · 아래쪽 전구 수 · 전원 연결 · 모형 전원 전압 | 분야별 검증 문서 참조 |
| 52 | [LC 필터](https://javalab.org/ko/lc_filter/) | layout-electronics.js | 100 Hz 입력 · 5 kHz 입력 · 반응 소자 · L: μH / C: μF · 비교 부하 저항 · 그림 위 직접 조작 | observed |
| 53 | [병렬 회로의 이해](https://javalab.org/ko/parallel_circuit/) | layout-circuits.js | 모양 변환 | 분야별 검증 문서 참조 |
| 54 | [검전기](https://javalab.org/ko/electroscope/) | layout-electrostatic.js | 막대의 대전 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 55 | [전위차 3](https://javalab.org/ko/electric_potential_3/) | layout-electrostatic.js | 저항 R₁ · 저항 R₂ · 전지 전압 · 전압계 값 · 전류계 값 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 56 | [전위차 2](https://javalab.org/ko/electric_potential_2/) | layout-electrostatic.js | 왼쪽 부품 · 가운데 부품 · 오른쪽 부품 · 중간 접점 전압 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 57 | [휘트스톤 브리지](https://javalab.org/ko/wheatstone_bridge/) | layout-circuits.js | 전원 · 저항 R1 · 저항 R2 · 저항 R3 · 저항 R4 | 분야별 검증 문서 참조 |
| 58 | [7-세그먼트 디스플레이](https://javalab.org/ko/fnd/) | layout-electronics.js | 접촉할 핀 · 그림 위 직접 조작 | observed |
| 59 | [전파 통신](https://javalab.org/ko/radio_wave_communication/) | layout-electronics.js | 줌 · 관찰 위치 · 실행 · 그림 위 직접 조작 | observed |
| 60 | [계단 스위치](https://javalab.org/ko/stairbulb/) | layout-circuits.js | 아래층 스위치 · 위층 스위치 · 모형 전압 · 전등 등가 저항 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 61 | [철과 알루미늄의 분리](https://javalab.org/ko/separation_of_iron_and_aluminum/) | layout-magnetic.js | 철 · 알루미늄 · 자석 바퀴 · 운반 속도 | observed-spatial-layout |
| 62 | [인덕터와 커패시터](https://javalab.org/ko/inductor_and_capacitor/) | layout-transients.js | 공통 저항 · 인덕턴스 · 전기 용량 · 두 회로 공통 스위치 · 실행 · 그림 위 직접 조작 | observed |
| 63 | [전자기파의 종류](https://javalab.org/ko/electromagnetic_waves/) | layout-electronics.js | 주파수 log₁₀(f/Hz) · 그림 위 직접 조작 | observed |
| 64 | [음극선관](https://javalab.org/ko/crt/) | layout-electronics.js | 관찰 모드 · 가속 전압 · 편향 전압 · 자기장 · 화면 밖 양수 · 장애물 세로 위치 · 그림 위 직접 조작 | static-layout-only |
| 65 | [교류 발전기](https://javalab.org/ko/ac_generator/) | layout-magnetic.js | 바람 세기 · 부하 · 실행 · 자기장 · 전류 | observed-spatial-layout |
| 66 | [반가산기(Half Adder)](https://javalab.org/ko/half_adder/) | layout-electronics.js | 입력 A · 입력 B · 전류 · 그림 위 직접 조작 | observed |
| 67 | [직류 전동기 2](https://javalab.org/ko/dc_motor_2/) | layout-magnetic.js | 자기장 · 전류 · 힘 / 전자기력 · 돌림힘 / 토크 · 실행 · 회전자 각도 · 전지 방향 반전 | observed-spatial-layout |
| 68 | [전자기력(전기 그네)](https://javalab.org/ko/lorentzs_force_3d/) | layout-magnetic.js | 원리 탐구: 전류 반전 · 자기장 표시 · 힘 표시 · 전류의 세기 · 그네 운동 | static-reference-only |
| 69 | [전기력선](https://javalab.org/ko/electric_field_line/) | layout-electrostatic.js | 왼쪽 전하 · 오른쪽 전하 · 물체 · 전기력선 진하기 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 70 | [전류계의 구조](https://javalab.org/ko/ammeter/) | layout-magnetic.js | 전류 표시 · 측정 범위 · 전류의 세기 | observed-spatial-layout |
| 71 | [정류 회로](https://javalab.org/ko/rectifier_circuit/) | layout-electronics.js | 전류 표시 · 그림 위 직접 조작 | observed |
| 72 | [전하량 보존 법칙](https://javalab.org/ko/charge_conservation/) | layout-electrostatic.js | 전구 연결 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 73 | [금속 결합 관점에서 본 정전기 유도](https://javalab.org/ko/electrostatic_induction_metal_bonding/) | layout-electrostatic.js | 막대의 대전 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 74 | [도체와 부도체의 정전기 유도](https://javalab.org/ko/conductor_and_insulator/) | layout-electrostatic.js | 막대의 대전 · 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 75 | [전선 주위의 자기장](https://javalab.org/ko/magnetic_field_around_a_wire/) | layout-magnetic.js | 전류 세기 · 전류 방향 전환 · 오른손의 법칙 · 나침반 · 그림 위 직접 조작 | observed-spatial-layout |
| 76 | [LC 진동 회로](https://javalab.org/ko/lc_oscillator/) | layout-electronics.js | 스위치 · 실행 · 속도 · 인덕턴스 · 전기 용량 · 그림 위 직접 조작 | observed |
| 77 | [트랜지스터의 원리](https://javalab.org/ko/transistor/) | layout-electronics.js | 베이스(B) 전류 · 그림 위 직접 조작 | observed |
| 78 | [금속의 에너지 띠(밴드)](https://javalab.org/ko/energy_band/) | layout-electrostatic.js | 그림 위 직접 조작 | 분야별 검증 문서 참조 |
| 79 | [인덕터와 커패시터 3](https://javalab.org/ko/inductor_and_capacitor_3/) | layout-electronics.js | 실행 · 주파수 · 공급 파형 · 그림 위 직접 조작 | observed |
| 80 | [인덕터와 커패시터 2](https://javalab.org/ko/inductor_and_capacitor_2/) | layout-electronics.js | 실행 · 주파수 · 공급 파형 · 그림 위 직접 조작 | observed |
| 81 | [자석은 왜 못을 끌어 당길까?](https://javalab.org/ko/magnetic_induction/) | layout-magnetic.js | 자석 극 뒤집기 · 그림 위 직접 조작 | layout-observed-interaction-partial |
| 82 | [전자기파의 방출](https://javalab.org/ko/electromagnetic_wave/) | layout-electronics.js | 관점 · 전기장 · 자기장 · 그림 위 직접 조작 | observed |
| 83 | [다이오드 만들기](https://javalab.org/ko/diode_making/) | layout-electronics.js | 그림 위 직접 조작 | observed |
