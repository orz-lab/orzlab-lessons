---
title: "Linear Regression"
lesson_number: 1
description: 
thumbnail: assets/images/courses/DeepLearning/DeepLearning-thumnail.png
layout: lesson
course_id: DeepLearning
author: "Phạm Đình Trung Hiếu"
visible: false
---



Trong bài viết này, mình sẽ giới thiệu về Linear Regression hay tên tiếng việt là "Hồi quy tuyến tính" (nghe sang phết). Đây là một trong những thuật toán cơ bản nhất của Machine Learning và là nền tản của các mô hình Deep Learning phức tạp hơn.

# Một bài toán thực tế

Giả sử chúng ta đang làm một khảo sát số giờ học và điểm thi của các học sinh trong một lớp.

Sau khi đi hỏi một vài bạn trong lớp, ta có một bảng dữ liệu nhỏ như sau:

| Học sinh | Số giờ học | Điểm thi |
| -------- | ---------- | -------- |
| 0 | 2 | 5 |
| 1 | 5 | 7 |
| 2 | 9 | 9.5 |
| 3 | 3 | 6 |
| 4 | 8 | 9 |


Để dễ hình dung hơn, hãy vẽ nó lên một biểu đồ, với trục hoành là `Số giờ học` và trục tung là `Điểm thi`. Mỗi cặp dữ liệu `(giờ học, điểm)` là một điểm trên biểu đồ.

<div style="width: 100%; height: 400px;">
  <canvas id="chart_0"></canvas>
</div>

Nhìn vào biểu đồ, bạn thấy gì không? Rõ ràng là có một xu hướng: học càng nhiều giờ thì điểm càng cao. Các điểm này trông có vẻ như đang nằm trên hoặc gần một đường thẳng nào đó.

Bây giờ chúng ta sẽ tiếp tục thu thập thêm dữ liệu và vẽ thêm vào biểu đồ để có thể hình dung dễ hơn.

<div style="width: 100%; height: 400px;">
  <canvas id="chart_1"></canvas>
</div>

Bây giờ thì xu hướng đã quá rõ ràng! Các điểm dữ liệu dường như đang xếp thành một đường đi lên từ trái sang phải. Ta có thể rút ra một nhận xét quan trọng: Có một mối quan hệ **đồng biến** giữa `thời gian học` và `điểm thi`. Thời gian học càng tăng thì điểm thi có xu hướng càng cao.

Nhận xét trên rất hữu ích, nhưng sức mạnh thực sự của nó nằm ở khả năng dự đoán.

**Bây giờ, bài toán thú vị hơn xuất hiện:** Giả sử có bạn một bạn khác, không có trong bảng khảo sát, đã dành $6.25$ giờ để học bài. Dựa vào xu hướng mà chúng ta vừa phát hiện, liệu ta có thể dự đoán điểm của Hoa là bao nhiêu không?

Câu trả lời là có! Nhìn vào biểu đồ, ta có thể dự đoán kết quả của bạn đó sẽ là tầm khoảng $8$ đến $8.2$.

{% capture quiz_question %}
Nếu một học sinh học $7.25$ giờ thì điểm của bạn sẽ tầm nhiêu?
{% endcapture %}

{% capture option_a %}
A. $6.5$ điểm
{% endcapture %}

{% capture option_b %}
B. $8.7$ điểm
{% endcapture %}

{% capture option_c %}
C. $9.2$ điểm
{% endcapture %}

{% capture option_d %}
D. $10$ điểm
{% endcapture %}

{% capture correct_label %}
B. $8.7$ điểm
{% endcapture %}

{% capture explanation %}
Dựa vào biểu đồ, khi số giờ học là $7.25$, điểm thi dự đoán sẽ khoảng $8.7$ điểm.
<center>
  <img src="/assets/images/courses/DeepLearning/lessons/LinearRegression/quiz_0.jpeg" alt="">
</center>
{% endcapture %}

{% include multiple_choice.html
  question_id="question1"
  question=quiz_question
  option_a=option_a
  option_b=option_b
  option_c=option_c
  option_d=option_d
  correct_answer="b"
  correct_label=correct_label
  explanation=explanation
%}


<script src="/assets/images/courses/DeepLearning/lessons/LinearRegression/anim.js"></script>

