export interface Qualification {
  id: number;
  title: string;
  body: string;
}

export interface CertificationDate {
  examRound: string;                      // 회차
  preExamRegistrationStartDate: string;   // 필기 원서 접수 시작일
  preExamRegistrationEndDate: string;     // 필기 원서 접수 종료일
  preExamDate: string;                    // 필기 시험 일자
  preExamResultDate: string;              // 필기 시험 합격자 발표일
  docSubmissionStartDate: string;         // 응시자격 서류제출 및 필기시험 합격자 결정시작일자
  docSubmissionEndDate: string;           // 응시자격 서류제출 및 필기시험 합격자 결정종료일자
  finalExamRegistrationStartDate: string; // 실기 원서 접수 시작일
  finalExamRegistrationEndDate: string;   // 실기 원서 접수 종료일
  finalExamStartDate: string;             // 실기 시험 시작일
  finalExamEndDate: string;               // 실기 시험 종료일
  finalExamResultDate: string;            // 합격자 발표
}
