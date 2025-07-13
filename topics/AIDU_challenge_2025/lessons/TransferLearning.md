---
title: "Giới thiệu về Transfer Learning"
lesson_number: 1
description: 
thumbnail: /assets/images/courses/AIDU_challenge_2025/aidu.png
layout: lesson
course_id: AIDU_challenge_2025
author: "Phạm Đình Trung Hiếu"
---

<div class="lesson-quote">
  <blockquote>
    "Bước đột phá thật sự sẽ đến khi các mô hình AI có thể chuyển giao những khái niệm trừu tượng từ nhiệm vụ này sang nhiệm vụ khác giống như con người."
  </blockquote>
  <cite> - Yoshua Bengio - </cite>
</div>

# Giới thiệu
Trong quá trình bạn huấn luyện một mô hình, chắc hẳn bạn đã gặp phải một số vấn đề như độ chính xác của mô hình của bạn rất thấp dù bạn đã dùng một kiến trúc rất tốt. Đôi lúc nó còn tệ hơn cả những mô hình có kiến trúc phèn hơn và thấp hơn mô hình của bạn trong các bài benchmark. Vậy vấn đề là do đâu?

Thông thường một mô hình dự đoán ra một kết kém hơn so với kì vọng là do một số nguyên nhân thường thấy sau:

* Dữ liệu của bạn quá bé, không đủ để mô hình có thể học được và <span class="expandable-term" data-term="generalize">generalize<button class="term-button">?</button></span>.

<div class="term-explanation" id="generalize-explanation">
    <strong>Generalize hay Khái quát hóa:</strong>
    Là khả năng của mô hình để hoạt động tốt trên dữ liệu mới, dù chưa từng thấy trong quá trình training. Một mô hình generalize tốt sẽ có hiệu suất tương tự giữa training set và test set.
  
</div>

* Dữ liệu của bạn có thể to nhưng bị mất cân bằng quá lớn, kiểu như có tận 10000 tấm hình con chó nhưng chỉ có 10 tấm hình con mèo.

* Các hyperparameter bạn đặt chưa được tối ưu.

Vấn đề cuối cùng thì bạn có thể xử lý rất dễ bằng việc thử nghiệm với các hyperparameter khác. Nhưng còn 2 vấn đề đầu thì sao, có cách nào để giải quyết không?

