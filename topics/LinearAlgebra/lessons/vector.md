---
title: "Vector - Viên Gạch Nền Tảng Của Đại Số Tuyến Tính"
lesson_number: 1
description: 
thumbnail: /assets/images/courses/AIDU_challenge_2025/aidu.png
layout: lesson
course_id: LinearAlgebra
author: "Phạm Đình Trung Hiếu"
---

Vector. Nghe quen đúng không?

Bạn có thể đã gặp nó đâu đó trong môn **Toán**, hay trong **Vật Lý** với mấy mũi tên chỉ lực rồi. Còn nếu chưa hoặc bạn đã quên thì bài viết này là dành cho bạn. À thực ra thì với các bạn còn nhớ về nó thì việc đọc bài viết này có thể giúp bạn hiểu thêm một vài khía cạnh khác của vector, mà có thể giáo viên trên trường đã không nói với bạn.

Trong lĩnh vực **Khoa học Máy tính** và đặc biệt là **Machine Learning**, vector không chỉ là những mũi tên. Nó là ngôn ngữ để chúng ta biểu diễn dữ liệu. Ta hãy cùng nhau mổ xẻ khái niệm này theo 2 góc nhìn chính, cũng như là 2 cách mà chúng ta sẽ dùng để  biểu diễn vector.


# Vector là một mũi tên trong không gian

{% capture wind_controls %}
<div>
  <label for="wind-direction">Hướng Gió (0°-360°):</label>
  <input type="range" id="wind-direction" min="0" max="360" value="45">
  <span id="direction-value">45°</span>
</div>
<div>
  <label for="wind-speed">Tốc Độ Gió (0-100) km/h:</label>
  <input type="range" id="wind-speed" min="0" max="100" value="50">
  <span id="speed-value">50</span>
</div>
{% endcapture %}

<div id="wind_vector">
{% include animation.html
  title="Mô phỏng Gió và Vector"
  animation_type="p5"
  container_id="wind-canvas-container"
  function_name="createWindVectorAnimation"
  script_path="/assets/animations/p5/LinearAlgebra/wind_vector.js"
  controls_html=wind_controls
%}
</div>

Hãy nhìn vào [animation](#wind_vector) mô phỏng gió bạn đang thấy. Mũi tên màu xanh đó không chỉ là một hình vẽ, nó chính là một *vector*. Trong thế giới chúng ta, các đại lượng có hướng như lực, vận tốc, hay như trong ví dụ này là "gió", đều được biểu diễn bằng *vector*.

Tại sao vậy? Vì để mô tả một cơn gió, chúng ta cần biết hai thông tin cốt lõi:
* Nó thổi theo hướng nào?
* Nó thổi mạnh như thế nào?

## Hướng (Direction)
Hãy thử kéo thanh trượt "Hướng Gió". Bạn sẽ thấy mũi tên xoay tròn. Khi nó chỉ sang phải, đó là gió thổi về hướng Đông. Khi nó chỉ lên trên, đó là gió thổi về hướng Bắc. Cái cách mà mũi tên "chỉ" vào một phía chính là hướng của vector. Mỗi giá trị từ 0° đến 360° tương ứng với một hướng duy nhất trong không gian.

## Độ lớn (Magnitude)
Bây giờ, hãy kéo thanh trượt "Tốc Độ Gió". Khi bạn tăng giá trị, mũi tên sẽ dài ra. Khi bạn giảm giá trị, nó ngắn lại. Độ dài của mũi tên này đại diện cho độ lớn (hay cường độ) của vector. Trong ví dụ này, độ lớn chính là tốc độ gió: một mũi tên dài thể hiện một cơn gió mạnh (ví dụ 100 km/h), trong khi một mũi tên ngắn chỉ là một làn gió nhẹ (ví dụ 10 km/h).

<blockquote>
Như vậy, từ góc nhìn này, một vector đơn giản là một đối tượng gói gọn cả hai thông tin: <strong>Hướng</strong> và <strong>Độ Lớn</strong>.
</blockquote>

## Vị trí không quan trọng
Ở ví dụ bên trên, chúng ta vẽ mũi tên gió ở trung tâm để dễ quan sát. Nhưng hãy tưởng tượng, một cơn gió mạnh 100 km/h thổi về hướng Đông không chỉ tồn tại ở một điểm. Nó có thể đang thổi ở vị trí của bạn, và cũng đang thổi y hệt như vậy ở cách đó vài mét.

Miễn là hướng (hướng Đông) và độ lớn (100 km/h) không đổi, thì dù mũi tên đó được vẽ ở đâu, nó vẫn biểu diễn cùng một vector gió. Đây là một khái niệm cốt lõi: `Vector được xác định bởi hướng và độ lớn, chứ không phải bởi vị trí bắt đầu của nó.`

<center>
  <img src="/assets/images/courses/LinearAlgebra/lessons/Vector/5_same_vector.png" alt="" width="300">
  <em>Tất cả các mũi tên này đều biểu diễn cùng một vector vì chúng có cùng hướng và cùng độ dài.</em>
</center>

# Vector là một danh sách các con số

Góc nhìn về "mũi tên" có hướng và độ lớn rất trực quan, nhưng nó đặt ra một câu hỏi lớn: Làm thế nào để "bảo" một chiếc máy tính vẽ ra mũi tên đó? Máy tính không hiểu "hướng Đông-Bắc" hay "dài một chút", nó chỉ làm việc với các con số.

Đây là lúc chúng ta cần một thứ để liên kết *thế giới hình học* và *thế giới số*. Cây cầu đó chính là **hệ trục tọa độ**.

Hãy tưởng tượng chúng ta đặt mũi tên vector vào một hệ trục tọa độ $Oxy$ quen thuộc. Để cho mọi thứ đơn giản và nhất quán, chúng ta luôn đặt gốc của mũi tên vào gốc tọa độ $(0, 0)$. 

Khi đã làm vậy, toàn bộ vector giờ đây được xác định một cách duy nhất bởi một thứ: vị trí của đầu mũi tên. Và trong một hệ tọa độ, mọi vị trí đều có một "địa chỉ" rõ ràng.

Hãy thử tương tác với [Animation dưới đây](#vector_in_coord), chúng ta có thể biểu diễn một *vector* chỉ với tọa độ của đầu mũi tên của *vector* đó là điểm $(x,y)$.

{% capture anim_1_controls %}
<div id="anim_1-controls" style="margin-top: 10px; font-family: monospace; font-size: 1.1em;">
  <span>Vector v = [</span>
  <label for="coord-x-1" class="sr-only">Tọa độ X</label>
  <input type="number" id="coord-x-1" value="4.0" step="0.1" style="width: 60px; text-align: center;">
  <span>, </span>
  <label for="coord-y-1" class="sr-only">Tọa độ Y</label>
  <input type="number" id="coord-y-1" value="3.0" step="0.1" style="width: 60px; text-align: center;">
  <span>]</span>
</div>
{% endcapture %}

<div id="vector_in_coord">
{% include animation.html
  title="Vector trong hệ tọa độ"
  animation_type="p5"
  container_id="anim_1-canvas-container"
  function_name="VectorInCoord"
  script_path="/assets/animations/p5/LinearAlgebra/vector_in_coord.js"
  controls_html=anim_1_controls
  controls_config='{"inputX": "coord-x-1", "inputY": "coord-y-1"}'
%}
</div>

Đầu tiên, hãy dùng chuột kéo đầu mũi tên màu hồng đến một vị trí bất kỳ. Bạn sẽ thấy hai con số trong các ô input $v = [x, y]$ thay đổi theo ngay lập tức. Các con số này chính là tọa độ của đầu mũi tên. Đây là cách chúng ta "dịch" một đối tượng hình học (mũi tên) thành dữ liệu dạng số. 

Tiếp theo, hãy thử làm ngược lại. Thay vì kéo mũi tên, bạn hãy thử nhập các con số vào ô input. Ví dụ, đổi $x=-5$ và $y=2$. Ngay lập tức, mũi tên sẽ tự điều chỉnh để đầu của nó chỉ vào đúng tọa độ $(−5,2)$.

Điều này cho thấy một sự tương ứng một-một (one-to-one correspondence):

* Mỗi mũi tên (bắt đầu từ gốc tọa độ) tương ứng với một cặp số duy nhất.
* Mỗi cặp số duy nhất tương ứng với một mũi tên duy nhất.

Điều này dẫn chúng ta đến **góc nhìn thứ hai**, và cũng là góc nhìn cốt lõi trong Khoa học Máy tính:

Trong đa phần các tài liệu, để phân biệt vector với các con số thông thường (scalars), người ta thường ký hiệu vector bằng một chữ cái in thường và in đậm (ví dụ $\textbf{v}$), hoặc có mũi tên ở trên (ví dụ $\vec{v}$).

Và đặc biệt trong Đại số Tuyến tính, quy ước chuẩn là viết vector dưới dạng vector cột (column vector):

$$
\textbf{v} = \begin{bmatrix}
4 \\
3 \\
\end{bmatrix}
$$

Con số ở trên ($4$) tương ứng với tọa độ trên trục $Ox$, và con số ở dưới ($3$) tương ứng với tọa độ trên trục $Oy$.

Tuy nhiên, khi lập trình, chúng ta thường biểu diễn nó như một mảng (array) hoặc danh sách (list): `v = [4 3]`. Trong văn bản, để tiết kiệm không gian, đôi khi người ta cũng viết theo hàng, nhưng chúng ta cần nhớ rằng về mặt toán học, nó thường được xem là một cột.

<blockquote>
Một vector đơn giản là một cách để "đóng gói" dữ liệu thành một <strong>danh sách các con số</strong> có thứ tự, đại diện cho vector đó không gian.
</blockquote>

{% capture quiz_question %}
Đây là giá trị của vector trong hình dưới đây?
<center>

  <img src="/assets/images/courses/LinearAlgebra/lessons/Vector/quiz_0.png" alt="" width="400">
</center>
{% endcapture %}

{% capture option_a %}
A. $\begin{bmatrix}4 \\ -7 \end{bmatrix}$
{% endcapture %}

{% capture option_b %}
B. $\begin{bmatrix}2 \\ -7 \end{bmatrix}$
{% endcapture %}

{% capture option_c %}
C. $\begin{bmatrix}4 \\ 7 \end{bmatrix}$
{% endcapture %}

{% capture option_d %}
D. $\begin{bmatrix}3 \\ 6 \end{bmatrix}$
{% endcapture %}

{% capture correct_label %}
C. $\begin{bmatrix}4 \\ 7 \end{bmatrix}$
{% endcapture %}

{% include multiple_choice.html
  question_id="question1"
  question=quiz_question
  option_a=option_a
  option_b=option_b
  option_c=option_c
  option_d=option_d
  correct_answer="c"
  correct_label=correct_label
%}

# Liên kết hai góc nhìn: Tính toán Độ lớn từ Tọa độ
Chúng ta đã nói vector có Hướng và Độ lớn. Khi biểu diễn vector dưới dạng số $$\begin{bmatrix}x \\ y \end{bmatrix}$$, làm sao chúng ta tính được độ lớn (độ dài) của nó?

Nếu nhìn vào [ví dụ này](#vector_in_coord_with_triangle), bạn có thể nhận ra một tam giác vuông quen thuộc được tạo bởi vector và hình chiếu của nó lên các trục tọa độ.


{% capture anim_2_controls %}
<div id="anim_2-controls" style="margin-top: 10px; font-family: monospace; font-size: 1.1em;">
  <span>Vector v = [</span>
  <label for="coord-x-2" class="sr-only">Tọa độ X</label>
  <input type="number" id="coord-x-2" value="4.0" step="0.1" style="width: 60px; text-align: center;">
  <span>, </span>
  <label for="coord-y-2" class="sr-only">Tọa độ Y</label>
  <input type="number" id="coord-y-2" value="3.0" step="0.1" style="width: 60px; text-align: center;">
  <span>]</span>
</div>
{% endcapture %}

<div id="vector_in_coord_with_triangle">
{% include animation.html
  title="<b>Độ dài/Độ lớn</b> của vector trong hệ tọa độ"
  animation_type="p5"
  container_id="anim_2-canvas-container"
  function_name="VectorInCoord"
  script_path="/assets/animations/p5/LinearAlgebra/vector_in_coord_with_triangle.js"
  controls_html=anim_2_controls
  controls_config='{"inputX": "coord-x-2", "inputY": "coord-y-2"}'
%}
</div>

**Cạnh huyền** của tam giác vuông này chính là **độ dài/độ lớn** $S$ của vector. Hai cạnh góc vuông có độ dài lần lượt là $x$ và $y$. Theo định lý Pythagoras quen thuộc:

$$
\begin{equation}
S^2 = x^2 + y^2 \\
S = \sqrt{x^2 + y^2} 
\end{equation}
$$

Độ lớn của vector $\textbf{v}$ thường được ký hiệu là $\|\textbf{v}\|$.

Ví dụ với vector $$\textbf{v} = \begin{bmatrix}4 \\ 3 \end{bmatrix}$$, **độ dài/độ lớn** của nó sẽ là:

$$
\|\textbf{v}\| = \sqrt{4^2 + 3^2} = \sqrt{16 + 9} = \sqrt{25} = 5
$$

