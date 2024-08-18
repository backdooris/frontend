export interface Qualification {
  id: number;
  title: string;
  body: string;
}
/*
<ilecnt1>4</ilecnt1>
<ilecnt2>2</ilecnt2>
<ilecnt3>3</ilecnt3>
<ilecnt4>5</ilecnt4>
<ilecnt5>7</ilecnt5>
<ilecnt6>32</ilecnt6>
<ilpcnt1>2</ilpcnt1>
<ilpcnt2>1</ilpcnt2>
<ilpcnt3>1</ilpcnt3>
<ilpcnt4>2</ilpcnt4>
<ilpcnt5>3</ilpcnt5>
<ilpcnt6>17</ilpcnt6>
<ilrcnt1>4</ilrcnt1>
<ilrcnt2>3</ilrcnt2>
<ilrcnt3>3</ilrcnt3>
<ilrcnt4>5</ilrcnt4>
<ilrcnt5>7</ilrcnt5>
<ilrcnt6>32</ilrcnt6>
<jmnm>제품디자인기술사</jmnm>
*/
export interface StatisticInfo {
  jmnm: string;
  ilecnt1: number;
  ilecnt2: number;
  ilecnt3: number;
  ilecnt4: number;
  ilecnt5: number;
  ilecnt6: number;
  ilpcnt1: number;
  ilpcnt2: number;
  ilpcnt3: number;
  ilpcnt4: number;
  ilpcnt5: number;
  ilpcnt6: number;
  ilrcnt1: number;
  ilrcnt2: number;
  ilrcnt3: number;
  ilrcnt4: number;
  ilrcnt5: number;
  ilrcnt6: number;
}

export interface StatisticGenderInfo {
  jmnm: string;
  sexnm: "남자" | "여자";
  ilpcnt1: number;
  ilpcnt2: number;
  ilpcnt3: number;
  ilpcnt4: number;
  ilpcnt5: number;
  ilpcnt6: number;
}

export interface CertificationDetail {
  id: number;
  data: {
    job_total_cnt: number;
    job_total_view_cnt: number;
    job_total_apply_cnt: number;
    job_total_experience: {
      신입: number;
      "1년 미만": number;
      "1~3년 미만": number;
      "3~5년 미만": number;
      "5~10년 미만": number;
      "10년 이상": number;
    };
    job_total_education: {
      중졸이하: number;
      고졸: number;
      초대졸: number;
      대졸: number;
      석박사: number;
    };
    job_total_salary: {
      "1400만원 미만": number;
      "1400~1800만원 미만": number;
      "1800~2200만원 미만": number;
      "2200~2600만원 미만": number;
      "2600~3000만원 미만": number;
      "3000~3400만원 미만": number;
      "3400~4000만원 미만": number;
      "4000만원 이상": number;
    };
    job_total_age: {
      "20세 미만": number;
      "21~25세": number;
      "26~30세": number;
      "31~35세": number;
      "36~40세": number;
      "41~45세": number;
      "46~50세": number;
      "51세 이상": number;
    };
    job_total_gender: {
      여성: number;
      남성: number;
    };
  };
}
