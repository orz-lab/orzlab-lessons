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

Bạn có thể đã gặp nó đâu đó trong môn Toán, hay trong Vật Lý với mấy mũi tên chỉ lực rồi. Còn nếu chưa hoặc bạn đã quên thì bài viết này là dành cho bạn. À thực ra thì với các bạn còn nhớ về nó thì việc đọc bài viết này có thể giúp bạn hiểu thêm một vài khía cạnh khác của vector, mà có thể giáo viên trên trường đã không nói với bạn.

Ở ngoài đời, chúng ta có thể biểu diễn rất nhiều thứ chỉ với 1 đơn vị đo. Ví dụ như nhiệt độ hôm nay, khoảng cách từ A đến B, tuổi của bạn, v.v. Nhưng cũng có rất nhiều đối tượng mà bạn không thể biểu diễn chúng một cách cụ thể với chỉ 1 đơn vị. Đơn cử như một cơn gió. Bạn không thể nói "cơn gió hôm nay là 10 km/h" được. 10 km/h rồi sao? Và nó thổi đi đâu? Để mô tả đầy đủ một cơn gió, bạn cần cả hướng (ví dụ: Đông Bắc) và độ lớn (ví dụ: 10 km/h).

{% include animation.html
    title="Mô phỏng Gió và Vector"
    content_file="anim/LinearAlgebra/lessons/Vector/wind_vector_0.html"
%}

# Hai góc nhìn về Vector

Quay trở lại vấn đề chính, để thực sự "tiêu hóa" được khái niệm vector, chúng ta cần nhìn nó dưới hai lăng kính bổ trợ cho nhau, đúng như câu trích dẫn ở đầu bài.


## Góc nhìn của Toán học và Vật lý:

Đây là cách tiếp cận phổ biến nhất ở bậc phổ thông. Theo góc nhìn này, một vector được định nghĩa bởi hai thuộc tính cơ bản:

* **Độ lớn (Magnitude):** Độ dài của mũi tên.

* **Hướng (Direction):** Hướng mà mũi tên chỉ tới.

Với ví dụ về cơn gió, chúng ta có thể vẽ một mũi tên hướng về phía Đông Bắc, với độ dài tỉ lệ với tốc độ 10 km/h. Một cơn gió khác mạnh 20 km/h cũng thổi về hướng Đông Bắc sẽ được biểu diễn bằng một mũi tên cùng hướng nhưng dài gấp đôi.

<center>
  <img src="/assets/images/courses/LinearAlgebra/lessons/Vector/vector_0.png" alt="" width="300">
</center>
