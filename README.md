# VUI ĐỂ HỌC – BẢN PWA

## Nội dung
- Giao diện thích ứng cho máy tính, iPhone/iPad và Android.
- Nút **Chơi Toán (10 câu ngẫu nhiên)**: mỗi lượt tạo 10 phép tính cộng/trừ mới.
- Số hạng và kết quả của từng phép tính đều trong phạm vi 1–20.
- Mỗi câu có 4 lựa chọn A–D; vị trí đáp án đúng được xáo trộn.
- Giữ lại trò chơi nhận diện 4 cử chỉ, camera, chấm điểm, thời gian, tạm dừng và chơi lại.
- Giữ ngân hàng câu hỏi, nhập Word, thiết lập hình ảnh và cấu hình của ứng dụng gốc.
- Có PWA manifest, biểu tượng và service worker.

## Triển khai
1. Giải nén toàn bộ thư mục `Vui_De_Hoc_PWA`.
2. Đưa toàn bộ nội dung thư mục lên máy chủ web hỗ trợ HTTPS.
3. Mở URL `https://.../index.html`.
4. Cho phép quyền Camera khi bắt đầu chơi hoặc kiểm tra camera.

## Cài lên màn hình chính
- iPhone/iPad: mở bằng Safari → Chia sẻ → Thêm vào MH chính.
- Android: mở bằng Chrome → menu ⋮ → Install app / Add to Home screen.
- Máy tính: mở bằng Chrome/Edge → Install trên thanh địa chỉ hoặc menu.

## Lưu ý
- Camera cần HTTPS hoặc localhost; mở trực tiếp file HTML bằng `file://` không đảm bảo quyền camera.
- MediaPipe và mô hình AI tải từ CDN/Google, cần Internet khi khởi động nhận diện.
- Bộ khung PWA được cache; không cam kết nhận diện AI hoạt động offline.
- Dữ liệu ngân hàng câu hỏi và cài đặt vẫn lưu trong bộ nhớ trình duyệt của từng thiết bị, không tự đồng bộ giữa các thiết bị.


## Cập nhật 07/11/2026
- Mỗi lượt Toán tạo đúng 10 câu; bộ câu hỏi riêng chọn ngẫu nhiên 10 câu và yêu cầu ngân hàng có tối thiểu 10 câu.
- Bổ sung lời đọc tiếng Việt “Đúng!” / “Sai!” sau từng câu trả lời.
- Kết thúc lượt chơi có âm thanh vỗ tay và nhân vật học sinh 3D thực hiện động tác vỗ tay.
- Giữ cơ chế camera/MediaPipe và quy ước cử chỉ A–D.


## Nhân vật và cử chỉ (bản cập nhật)
- Người chơi chọn Bé trai hoặc Bé gái trước khi bắt đầu; lựa chọn được lưu trên thiết bị.
- Nhân vật 3D có bốn tư thế chuyển động tương ứng: tay phải giơ lên, hai tay giơ cao, hai tay dang ngang, tay trái giơ lên.
- Service Worker đã tăng cache lên v4 để nhận phiên bản mới.


Bản cập nhật v5: giữ tạo hình nhân vật bé gái/bé trai theo ảnh tham chiếu người dùng cung cấp; tích hợp 8 ảnh tư thế (4 tư thế cho mỗi nhân vật) trực tiếp trong index.html. Không cần tải thêm tệp ảnh riêng.


Bản cập nhật: tăng kích thước chữ hướng dẫn cử chỉ và đọc thành tiếng điểm đạt được sau mỗi lượt thi. Cache Service Worker: vui-de-hoc-shell-v7.


Cập nhật v8: bổ sung nút thu gọn/mở rộng cụm thiết lập dạng bài và phạm vi số; trạng thái thu gọn được lưu trên thiết bị và hoạt động trên máy tính, điện thoại.


Cập nhật v9: thay tư thế minh họa bé trai ở đáp án A theo hình đã duyệt (tay phải giơ rõ phía trước); làm mới giao diện phần thi theo phong cách infographic sân trường, tối ưu bố cục trên điện thoại và máy tính.


Cập nhật v10: tự động đọc to câu hỏi, nội dung từng đáp án và hướng dẫn cử chỉ bằng giọng tiếng Việt sau khi hiển thị mỗi câu; tăng cỡ chữ, độ đậm và tương phản cho chữ đáp án/hướng dẫn cử chỉ.


Cập nhật v11: thời gian trả lời mỗi câu trong lượt thi được đặt cố định 30 giây; mặc định thiết lập cũng đổi từ 20 lên 30 giây, bao gồm dữ liệu câu hỏi đã lưu trước đó.


Cập nhật v12: giọng đọc chỉ đọc biểu thức số học/phép so sánh trong câu hỏi và lần lượt đọc giá trị các lựa chọn; bỏ icon trang trí, nhãn đáp án và hướng dẫn cử chỉ khỏi phần đọc.


Cập nhật v13: nới ngưỡng nhận diện tay trái/tay phải, giảm ngưỡng visibility, bổ sung lọc ổn định 3/5 khung hình, tăng tần suất nhận diện và giảm thời gian giữ cử chỉ từ 0,8 xuống 0,6 giây.


Cập nhật v14: giọng đọc gồm số thứ tự câu hỏi, nội dung phép tính/phép so sánh và lần lượt nhãn đáp án A-D kèm hướng dẫn cử chỉ tương ứng; không đọc icon trang trí hoặc giá trị số trong các ô đáp án.


Cập nhật v15: cải thiện nhận diện tay trái/phải bằng ngưỡng cổ tay linh hoạt và bổ sung khuỷu tay khi tay giơ chếch; giảm lọc ổn định từ 3/5 xuống 2/3 khung hình để phản hồi nhanh hơn.

## Cập nhật v17 – Toán học và Tiếng Anh
- Bổ sung phép nhân và phép chia vào phần Toán học; chế độ hỗn hợp hiện xáo trộn phép cộng, trừ, nhân, chia và so sánh.
- Bổ sung 7 chủ đề Tiếng Anh: Thiên nhiên; Động vật trên bờ; Động vật dưới biển; Phương tiện giao thông; Dụng cụ trong gia đình; Dụng cụ học tập; Gia phả trong gia đình.
- Mỗi chủ đề có ngân hàng từ vựng minh họa riêng; mỗi lượt lấy ngẫu nhiên 10 câu không lặp trong lượt đó.
- Có lựa chọn thi theo chủ đề đã chọn hoặc chọn chủ đề ngẫu nhiên.
- Hình minh họa được tạo trực tiếp trong ứng dụng cho câu hỏi và từng phương án; có hiệu ứng nổi/chuyển động 3D bằng CSS. Câu hỏi và các lựa chọn tiếng Anh được đọc bằng giọng tiếng Anh nếu thiết bị có giọng phù hợp.
- Giữ nguyên các chức năng sẵn có: camera, nhận diện 4 cử chỉ, chấm điểm, đồng hồ, tạm dừng/chơi lại, ngân hàng câu hỏi riêng, nhập/xuất dữ liệu và thiết lập giáo viên.

## Bổ sung v18 – Lớp học Tiếng Anh theo chủ đề
- Bổ sung chế độ giảng dạy riêng, không dùng giao diện trắc nghiệm.
- Hỗ trợ học tuần tự và mở danh sách từ vựng cho 9 chủ đề.
- Bổ sung chủ đề đếm số 0–100 (101 mục) và bảng chữ cái A–Z (26 chữ).
- Có điều khiển phát âm lựa chọn en-GB (Anh-Anh) và en-US (Anh-Mỹ), phát tự động, nghe lại, trước/sau.
- Hình minh họa dạng SVG/emoji được tạo trong ứng dụng, kết hợp chuyển động CSS 3D.
- Lưu ý: phát âm dùng SpeechSynthesis/giọng hệ điều hành; giọng cụ thể phụ thuộc trình duyệt và các voice đã cài trên thiết bị. Không cam kết thiết bị nào cũng có voice bản ngữ Anh-Anh/Anh-Mỹ.


## Bản cập nhật v19 – Chế độ học tập và thi trắc nghiệm

- Hai nút lựa chọn riêng dạng thẻ icon 3D: HỌC TẬP và THI TRẮC NGHIỆM.
- Bổ sung 10 từ vựng cho mỗi ngân hàng: Thiên nhiên, Động vật trên bờ, Động vật dưới biển, Phương tiện giao thông, Dụng cụ gia đình, Dụng cụ học tập, Gia đình.
- Mở rộng bài giảng theo từng từ: ví dụ song ngữ, nội dung ghi nhớ, phần bé thực hành đọc, danh sách từ.
- Cô giáo hoạt hình được dựng bằng CSS với cử chỉ chỉ tay, chuyển động thân và hiệu ứng khi chuyển từ.
- Số từ 0 đến 100 hiển thị cách viết tiếng Anh; bảng chữ cái A–Z có ví dụ minh họa.
- Phát âm Anh-Anh (en-GB) và Anh-Mỹ (en-US) sử dụng SpeechSynthesis voice khả dụng trên thiết bị. Tên và chất lượng voice phụ thuộc hệ điều hành/trình duyệt.
- Hiệu ứng 3D là CSS transform/animation; hình minh họa dựa trên biểu tượng/đồ họa SVG nội tuyến, không phải mô hình WebGL có rig xương.
- Nút Bé đọc thử dùng SpeechRecognition nếu trình duyệt hỗ trợ; nếu không, ứng dụng thông báo và vẫn cho phép nghe mẫu.


## Bản cập nhật v20 – Thế giới hình ảnh 3D chuyển động

- Thay bộ hình minh họa chủ đề bằng 9 cảnh 3D Cartoon đồng bộ: Thiên nhiên, Động vật trên bờ, Động vật dưới biển, Phương tiện giao thông, Dụng cụ gia đình, Dụng cụ học tập, Gia đình, Đếm số 0–100 và Bảng chữ cái A–Z.
- Mỗi bài học hiển thị cảnh nền theo đúng chủ đề, kết hợp hình từ vựng ở lớp trước.
- Thêm chuyển động CSS riêng cho từng nhóm: bơi lội, nhún/bật, di chuyển ngang, đung đưa, lắc nhẹ, nhảy số và nhảy chữ.
- Phần đáp án thi cũng có hiệu ứng nổi/chuyển động cho hình minh họa.
- Giữ nguyên ngân hàng câu hỏi, logic chọn 10 câu ngẫu nhiên, chấm điểm, camera và nhận diện cử chỉ.
- Cô giáo hoạt hình tiếp tục có chuyển động chỉ tay và chuyển động thân.
- Các cảnh chủ đề được lưu nội bộ trong images/topics để dùng khi triển khai PWA.
- Hiệu ứng là CSS 3D/2D animation trên các hình minh họa, không phải mô hình nhân vật WebGL có rig xương.


## Bản cập nhật v21 – Thiết kế lại MENU Tiếng Anh theo hình mẫu

- Thiết kế lại menu theo bố cục hình mẫu: logo/nhận diện, tiêu đề Tiếng Anh, thanh chọn môn, danh sách chủ đề bên trái, lưới 9 chủ đề có ảnh, khu vực cô giáo và trợ lý, hai nút HỌC TẬP và THI TRẮC NGHIỆM.
- Có nút chọn chủ đề ngẫu nhiên; bấm chủ đề ở thanh bên hoặc thẻ hình đều cập nhật lựa chọn đang dùng.
- Giữ nguyên ID điều khiển học tập/thi, logic ngân hàng câu hỏi, chọn 10 câu, phần giảng dạy, nhận diện cử chỉ và chức năng Toán học.
- Menu co giãn cho màn hình máy tính bảng và điện thoại.
- Cập nhật cache PWA lên v21.


## Bản v22 – Rà soát và sửa lỗi bố cục MENU

- Nguyên nhân chính của bản v21: phần HTML menu đã được thay mới nhưng stylesheet dành riêng cho menu không được đóng gói vào file HTML; trình duyệt vì vậy hiển thị gần như theo kiểu mặc định, khiến chữ, nút và thẻ ảnh bị co nhỏ/lệch bố cục.
- Bổ sung stylesheet v22 có phạm vi selector giới hạn trong `#englishSetupPanel`, tránh xung đột với CSS phần Toán và màn hình thi.
- Bố cục máy tính: thanh thương hiệu/tiêu đề, sidebar môn học và 9 chủ đề, vùng cô giáo/trợ lý, lưới 3 cột, hai nút học/thi lớn.
- Bố cục điện thoại: lưới 2 cột dễ đọc, danh sách chủ đề 3 cột, nút học/thi xếp dọc; không ép toàn bộ nội dung desktop vào màn hình hẹp.
- Mặc định mở MENU Tiếng Anh; phần thiết lập Toán học được ẩn khỏi màn hình chính và mở bằng nút Toán học. Có nút quay lại MENU Tiếng Anh.
- Thêm đầy đủ xử lý click đồng bộ giữa thẻ chủ đề, danh sách bên trái và lựa chọn ẩn; nút chọn chủ đề ngẫu nhiên cập nhật lựa chọn đang dùng.
- Rà soát manifest: sửa icon tham chiếu từ PNG không tồn tại sang `icon-192.webp` thực tế trong gói; sửa apple-touch-icon tương ứng.
- Service worker cache nâng lên v22.


## Bản v23 – Menu chính và phân cấp môn học

Cấu trúc điều hướng theo yêu cầu:
- Menu chính: **CHỌN MÔN HỌC**.
- Nhánh **Toán học**: có mục con **Thi trắc nghiệm**, mở đúng phần thiết lập/bộ đề Toán hiện có.
- Nhánh **Tiếng Anh**: có hai mục con **Giảng dạy** và **Thi trắc nghiệm**.
- **Giảng dạy** hiển thị đủ 9 chủ đề đã có: Thiên nhiên, Động vật trên bờ, Động vật dưới biển, Phương tiện giao thông, Dụng cụ trong gia đình, Dụng cụ học tập, Gia phả trong gia đình, Đếm số 0–100, Bảng chữ cái A–Z.
- Chọn thẻ/chủ đề ở sidebar đồng bộ với chủ đề được chọn cho bài giảng và đề thi.
- Nút chọn chủ đề ngẫu nhiên, nút Giảng dạy và nút Thi trắc nghiệm vẫn dùng luồng xử lý cũ.
- Giữ nguyên màn hình giáo viên, ngân hàng câu hỏi, cấu hình Toán, camera/AI, nhận diện cử chỉ, chấm điểm và nội dung bài học.
- Giao diện phân cấp được tối ưu cho máy tính và điện thoại; cache PWA cập nhật v23.


## v24 – Tái cấu trúc tổng thể màn hình khởi động và điều hướng

**Sửa nguyên nhân cấu trúc, không chỉ chỉnh CSS:**
- Trong v23, `englishSetupPanel` bị lồng bên trong `mathSetupPanel`, trong khi `mathSetupPanel` mang class `hidden`. Vì vậy menu Tiếng Anh nằm trong một vùng cha bị ẩn và không thể xuất hiện như màn hình chính.
- Tách riêng `mainMenu` thành màn hình cấp cao nhất, độc lập với `game` (màn hình thi) và `teacher` (khu vực giáo viên).
- Mặc định mở ứng dụng ở màn hình `CHỌN MÔN HỌC`; không hiển thị khung câu hỏi trống.
- Toán học > Thi trắc nghiệm mở phần cấu hình Toán; Tiếng Anh > Giảng dạy hiển thị 9 chủ đề; Tiếng Anh > Thi trắc nghiệm chạy luồng đề tiếng Anh 10 câu hiện có.
- Khi mở bài giảng hoặc bắt đầu thi, chuyển sang đúng màn hình tương ứng; quay lại bài giảng/menu không để các màn hình chồng lên nhau.
- Giữ khu vực giáo viên ở chế độ truy cập riêng qua nút Cài đặt giáo viên.
- Sửa CSS trạng thái ẩn của English menu: selector cũ `#englishSetupPanel.english-world-menu` có độ ưu tiên cao và ép `display:block`, làm hỏng trạng thái ẩn khi chuyển màn hình.
- Tách menu khỏi game shell giúp CSS bố cục câu hỏi/thi không tác động lên trang chọn môn.
- Cập nhật cache PWA lên v24.


## v25 – Biểu tượng MENU 3D động và thông báo biểu mẫu tiếng Việt

- Thay bộ biểu tượng điều hướng trong MENU bằng icon 3D có nền nổi, viền sáng, bóng đổ và chuyển động nhẹ.
- Đồng bộ biểu tượng cho Toán học, Tiếng Anh, Giảng dạy, Thi trắc nghiệm, chọn chủ đề ngẫu nhiên và 9 chủ đề giảng dạy.
- Làm rõ cấp MENU bằng mũi tên mở/thu, đường nối phân cấp, dấu nhánh và chấm nút liên kết.
- Bổ sung hiệu ứng ánh sáng lướt trên nút chọn chủ đề ngẫu nhiên.
- Thay hộp thoại trình duyệt đơn giản bằng hộp thoại 3D tiếng Việt: biểu tượng, tiêu đề, nội dung, nút xác nhận và nút quay lại.
- Thay xác nhận xóa câu hỏi bằng hộp thoại tùy chỉnh; các thông báo nhập/xuất tệp, lưu thiết lập, lỗi camera và thiếu câu hỏi đều hiển thị qua hộp thoại 3D.
- Việt hóa thông báo lỗi nhập DOCX, tệp không hợp lệ và lỗi khởi động; không đưa thông báo lỗi kỹ thuật tiếng Anh lên hộp thoại người dùng.
- Làm mới kiểu thông báo trong biểu mẫu theo phong cách nổi 3D.
- Tôn trọng cài đặt giảm chuyển động của thiết bị.
- Không thay đổi cấu trúc dữ liệu câu hỏi, ngân hàng câu hỏi, thuật toán chọn đề, phép tính hay luồng nhận diện cử chỉ.
- Cập nhật cache PWA lên v25.


## v26 – Cô giáo hoạt hình chuyển động và hướng dẫn mở camera tiếng Việt

- Thay hình cô giáo CSS cũ bằng nhân vật hoạt hình nhiều lớp: tóc, khuôn mặt, mắt, má, nụ cười, trang phục, tay vẫy, tay chỉ, sách và bóng đổ.
- Thêm hoạt ảnh nổi nhẹ, vẫy tay, chuyển động miệng như đang nói, chớp/nhấn nhá ánh nhìn, chuyển động tay chỉ bài; trợ lý robot cũng chuyển động.
- Thay lời chào tiếng Anh trên giao diện bằng nội dung tiếng Việt: “Xin chào các bé! Hôm nay chúng mình cùng khám phá thế giới nhé!”
- Trước khi gọi camera, ứng dụng hiển thị hộp thoại 3D tiếng Việt giải thích mục đích sử dụng camera và hướng dẫn chọn “Cho phép”.
- Việt hóa thông báo lỗi từ chối quyền camera, không tìm thấy camera, camera đang được ứng dụng khác sử dụng và lỗi mở camera.
- Đặt ngôn ngữ tài liệu HTML là `vi`.
- Lưu ý kỹ thuật: cửa sổ cấp quyền camera như “This file wants to use available cameras / Allow” là giao diện gốc do trình duyệt hoặc hệ điều hành hiển thị. Trang web không có API để đổi ngôn ngữ/nội dung của cửa sổ đó. v26 bổ sung hướng dẫn tiếng Việt ngay trước cửa sổ gốc; ngôn ngữ cửa sổ gốc phụ thuộc cài đặt ngôn ngữ trình duyệt/hệ điều hành.
- Không thay đổi cấu trúc dữ liệu, ngân hàng câu hỏi, thuật toán học/thi hoặc nhận diện cử chỉ.
- Cập nhật cache PWA lên v26.


## v27 – Nút đóng nội dung và bắt đầu thi Toán từ màn hình thiết lập

- Bổ sung nút **Đóng** trong màn hình thiết lập thi Toán; thao tác đưa người dùng về màn hình Chọn môn học.
- Bổ sung nút **BẮT ĐẦU THI TOÁN · 10 CÂU** ngay trong màn hình thiết lập Toán. Nút gọi đúng luồng tạo đề Toán 10 câu hiện có (`getMathConfig` → `generateMathSet` → `beginGameWithSet`), không tạo thuật toán đề mới.
- Bổ sung nút **Đóng** ở màn hình giảng dạy Tiếng Anh; có hộp thoại xác nhận tiếng Việt trước khi thoát.
- Bổ sung nút **Thoát bài thi** trên màn hình thi (dùng chung cho Toán và Tiếng Anh); có hộp thoại xác nhận, dừng trò chơi/camera và quay về menu.
- Giữ nút quay lại chủ đề hiện có trong bài giảng.
- Chuẩn hóa `showMainMenu()` để ẩn phần thiết lập Toán, hiện lại menu Tiếng Anh và dừng âm thanh/đếm tự động khi quay về menu.
- Không thay đổi ngân hàng câu hỏi, cấu trúc dữ liệu, quy tắc chọn 10 câu, thuật toán tính điểm, nhận diện cử chỉ hoặc camera.
- Cập nhật cache PWA lên v27.


## v28 – Sửa luồng nút bắt đầu/đóng và kết hợp cử chỉ + chạm đáp án Tiếng Anh

- Nút **BẮT ĐẦU THI TOÁN · 10 CÂU** gọi trực tiếp hàm `startMathQuiz()`; không còn mô phỏng click một nút ẩn ở màn hình thi.
- Nút bắt đầu Toán và nút bắt đầu Toán nội bộ dùng chung một hàm duy nhất để đọc cấu hình, sinh đúng 10 câu, lưu cấu hình chơi lại và gọi luồng bắt đầu hiện hữu.
- Bổ sung thông báo tiếng Việt cụ thể nếu cấu hình không hợp lệ hoặc không thể tạo đủ 10 câu.
- Nút **Đóng** ở màn hình thiết lập Toán gọi trực tiếp luồng quay về menu; nút thoát bài thi và nút đóng bài giảng có xác nhận, dừng camera/âm thanh và quay về menu.
- Thi Tiếng Anh: mỗi thẻ đáp án được gắn `role=button`, `tabindex`, nhãn truy cập; hỗ trợ chạm/click và Enter/Space.
- Cử chỉ vẫn được nhận diện theo 4 phím ánh xạ hiện có; thao tác chạm đáp án gọi chung hàm chấm điểm `answer()` để tránh tạo nhánh tính điểm riêng.
- Cho phép chạm đáp án Tiếng Anh ngay cả khi hệ thống đang chờ cử chỉ về tư thế nghỉ; cơ chế chờ tư thế nghỉ của thao tác nhận diện cử chỉ vẫn giữ nguyên.
- Bổ sung hướng dẫn hiển thị: “Bé có thể dùng cử chỉ tay trước camera hoặc chạm trực tiếp vào thẻ đáp án”.
- Không thay đổi ngân hàng câu hỏi, cấu trúc dữ liệu, nội dung đề, thuật toán tạo câu hỏi, điểm số hoặc luồng camera/AI.
- Cập nhật cache PWA lên v28.


## v29 – Điều chỉnh luồng Thi trắc nghiệm Toán

Luồng màn hình được cập nhật theo đúng thứ tự:
1. Chọn **Toán học → Thi trắc nghiệm**: mở màn hình thiết lập phần thi.
2. Chọn dạng phép tính, phạm vi số và nhân vật tại màn hình thiết lập.
3. Nhấn **BẮT ĐẦU THI TOÁN · 10 CÂU**: chuyển sang màn hình thi.
4. Nút **Đóng** được đặt trong phần thi, tại thanh tiêu đề phía trên.
5. Nhấn **Đóng** khi đang thi Toán: dừng trò chơi/camera/âm thanh, đóng màn hình thi và quay lại đúng màn hình thiết lập Toán; các lựa chọn thiết lập vẫn được giữ nguyên.
6. Không còn nút **Đóng** ở màn hình thiết lập Toán.

Phần đóng bài thi Tiếng Anh vẫn quay về màn hình chọn môn học; chỉ luồng Toán được chuyển về màn hình thiết lập như yêu cầu.
Cập nhật cache PWA lên v29.


## v30 – Hoàn thiện điều hướng Giảng dạy và Thi trắc nghiệm Tiếng Anh

- **Chọn chủ đề → Giảng dạy:** nút Giảng dạy mở đúng chủ đề đang được chọn trong menu.
- **Học chủ đề ngẫu nhiên → Giảng dạy:** nút Học chủ đề ngẫu nhiên chỉ chọn ngẫu nhiên một chủ đề, cập nhật trạng thái/chủ đề đang chọn; sau đó người học nhấn Giảng dạy để mở bài học.
- **Chọn chủ đề → Thi trắc nghiệm:** nút Thi trắc nghiệm mở bài thi của đúng chủ đề đang chọn.
- **Thi chủ đề ngẫu nhiên:** tự chọn ngẫu nhiên một chủ đề, cập nhật chủ đề đang chọn và mở bài thi ngay.
- Nút Thi trắc nghiệm trong menu phân cấp Tiếng Anh vẫn mở bài thi của chủ đề đang được chọn.
- Bảo toàn lựa chọn chủ đề dùng chung cho thẻ chủ đề, menu bên và danh sách chủ đề.
- Giữ nguyên cơ chế trả lời Tiếng Anh bằng nhận diện cử chỉ hoặc chạm/click thẻ đáp án; hai cách dùng chung hàm chấm điểm.
- Giữ nguyên ngân hàng câu hỏi, dữ liệu bài giảng, 10 câu mỗi lượt, tính điểm và cơ chế camera/AI.
- Cập nhật cache PWA lên v30.


## v31 – Tách độc lập hai MENU chính Toán học và Tiếng Anh

### Cấu trúc màn hình
- `mainMenu`: màn hình chọn môn học độc lập, chỉ có hai lựa chọn Toán học và Tiếng Anh.
- `mathSetupPanel`: màn hình riêng của Toán học, là phần tử con trực tiếp của `<main>`, không nằm trong menu Tiếng Anh.
- `englishSetupPanel`: màn hình riêng của Tiếng Anh, là phần tử con trực tiếp của `<main>`, không nằm trong menu Toán học.
- `game`: màn hình chơi/thi riêng. `englishLessonPanel` chỉ là nội dung lớp học trong vùng hiển thị trò chơi, không phải menu môn học.

### Điều hướng
- Chọn Toán học ở màn hình chọn môn → chỉ hiện thiết lập Toán.
- Chọn Tiếng Anh ở màn hình chọn môn → chỉ hiện menu Tiếng Anh.
- Menu Tiếng Anh chỉ còn điều hướng các chủ đề Tiếng Anh, Giảng dạy và Thi trắc nghiệm; đã bỏ liên kết điều hướng Toán học khỏi sidebar Tiếng Anh.
- Có nút `← Chọn môn học` riêng trên cả màn hình Toán và Tiếng Anh.
- Bắt đầu thi Toán/Anh sẽ ẩn toàn bộ màn hình menu và thiết lập trước khi hiện màn hình thi.
- Mở bài giảng Tiếng Anh sẽ ẩn menu chọn môn, thiết lập Toán và menu Tiếng Anh; chỉ hiện vùng bài giảng.
- Đóng bài thi Toán quay về thiết lập Toán; đóng bài thi Tiếng Anh hoặc bài giảng quay về menu Tiếng Anh.
- Chuyển về màn hình chọn môn chỉ hiển thị màn hình chọn môn.

### Bảo toàn
- Không thay đổi ngân hàng câu hỏi, bộ từ vựng, nội dung bài giảng, công thức sinh câu hỏi, số câu mỗi lượt, tính điểm, camera, AI hoặc hai cách trả lời Tiếng Anh (cử chỉ và chạm màn hình).
- Xóa các hàm/điều hướng cũ phụ thuộc vào `subjectMathToggle`, `subjectEnglishToggle`, `mathSubjectSubmenu`, `englishSubjectSubmenu`.
- Cập nhật cache PWA lên v31.


## v32 – Chọn đáp án Toán bằng chạm và mở rộng vốn từ Tiếng Anh

### Thi trắc nghiệm Toán
- Thẻ đáp án A/B/C/D hỗ trợ click/chạm trực tiếp và bàn phím Enter/Space.
- Nhận diện cử chỉ tay vẫn hoạt động song song qua vòng nhận diện hiện có.
- Cả hai phương thức đi qua cùng hàm `answer(...)`, dùng chung khóa câu hỏi, chấm điểm, âm thanh phản hồi và chuyển câu.
- Chạm trực tiếp được phép chọn kể cả khi hệ thống đang yêu cầu đưa tay về tư thế nghỉ sau một lượt cử chỉ.

### Chủ đề Gia đình
- Đổi tên hiển thị từ “Gia phả trong gia đình” thành “Gia đình” trong menu, thẻ chủ đề, danh sách thiết lập và tên chủ đề dữ liệu.
- Giữ nguyên khóa dữ liệu nội bộ `family` để không làm hỏng liên kết ngân hàng câu hỏi.

### Ngân hàng từ vựng Tiếng Anh
- Mở rộng vốn từ của Thiên nhiên: 50 mục.
- Động vật trên bờ: 50 mục.
- Động vật dưới biển: 46 mục.
- Phương tiện giao thông: 46 mục.
- Dụng cụ trong gia đình: 46 mục.
- Dụng cụ học tập: 46 mục.
- Gia đình: 55 mục.
- Đếm số 0–100: 101 mục.
- Bảng chữ cái A–Z: 26 mục, mỗi chữ có từ vựng minh họa như “A for Apple”.
- Bài giảng lấy dữ liệu từ cùng ngân hàng chủ đề; thi trắc nghiệm tạo lựa chọn từ cùng ngân hàng, mỗi lượt lấy 10 câu ngẫu nhiên không lặp.
- Mỗi mục tiếp tục sử dụng cấu trúc dữ liệu từ vựng hiện có: mã từ, cụm tiếng Anh, nghĩa tiếng Việt và biểu tượng minh họa.

- Cập nhật cache PWA lên v32.


## Phiên bản v33 – Ôn bài tập Toán lớp 1
- Bổ sung menu độc lập “Ôn bài tập lớp 1” bên cạnh “Thi trắc nghiệm”.
- Mỗi lượt tạo ngẫu nhiên 10 dạng bài từ ngân hàng: tính nhẩm, so sánh, điền số, tách số, sắp xếp, đúng/sai, nối phép tính, toán có lời văn, hình học cơ bản và dãy số.
- Giới hạn tối đa 35 phút; nộp bài chủ động hoặc tự động khi hết giờ; xác nhận trước khi nộp; chấm điểm và đọc kết quả bằng giọng tiếng Việt qua SpeechSynthesis của thiết bị.
- Phần luyện tập dùng trạng thái, bộ đếm giờ và cơ chế chấm điểm riêng, không dùng vòng lặp câu hỏi của phần thi trắc nghiệm Toán/Tiếng Anh.
- Hiệu ứng 3D được triển khai bằng CSS transform/animation; giọng đọc cần trình duyệt/thiết bị có hỗ trợ tiếng Việt.


## v34 – Chỉ hiển thị thiết lập khi chọn Thi trắc nghiệm Toán
- Khi mở menu Toán học, màn hình chỉ hiển thị hai lựa chọn: Thi trắc nghiệm và Ôn bài tập lớp 1.
- Ẩn tiêu đề thu gọn/mở rộng “CÙNG BÉ KHÁM PHÁ TOÁN HỌC” cùng toàn bộ thiết lập thi theo mặc định.
- Khi nhấn “Thi trắc nghiệm”, mới hiển thị tiêu đề và phần thiết lập thi Toán.
- Giữ khả năng thu gọn/mở rộng phần thiết lập sau khi đã vào đúng chức năng thi.
- Không thay đổi luồng Ôn bài tập lớp 1, menu Tiếng Anh, ngân hàng câu hỏi hoặc cơ chế nhận diện cử chỉ/chạm đáp án.
- Cập nhật cache PWA lên v34.


## v35 – Phân hệ CHƠI MÀ HỌC: GIẢI CỨU HÀNH TINH

### Vị trí menu
- Toán học → CHƠI MÀ HỌC → GIẢI CỨU HÀNH TINH.
- Phân hệ trò chơi được tách riêng khỏi Thi trắc nghiệm và Ôn bài tập lớp 1.

### Chức năng
- Màn hình cốt truyện, bảng điều khiển giáo viên, bản đồ 5 hành tinh, màn hình câu hỏi và kết quả.
- Giáo viên chọn môn học, lớp 1–5, tên bài, nội dung kiến thức, số câu 5/10/15, mức độ và 1–4 đội.
- Có ngân hàng mẫu 15 câu Toán học lớp 1; với môn/khối khác, giáo viên nhập câu hỏi tương ứng.
- Mỗi câu gồm 4 phương án, đáp án đúng, gợi ý và giải thích. Có thể thêm, sửa, xóa câu hỏi.
- Lưu bộ câu hỏi trong localStorage của trình duyệt trên thiết bị hiện tại.
- Câu hỏi được chọn ngẫu nhiên không lặp trong lượt; được sắp xếp tăng dần theo mức độ qua 5 hành tinh.
- Trả lời đúng: +10 điểm và thu thập 1 năng lượng. Trả lời sai: mất 1 lượt năng lượng và được thử lại.
- Có gợi ý, thanh tiến trình, điểm đội, hiệu ứng hành tinh/quái vật, âm thanh tổng hợp và đọc tiếng Việt bằng SpeechSynthesis nếu trình duyệt hỗ trợ.
- Không tích hợp API AI; không hiển thị giả lập AI tạo câu hỏi.

### Lưu ý sử dụng
- Dữ liệu bộ câu hỏi lưu cục bộ trên trình duyệt/thiết bị hiện tại; không tự đồng bộ giữa các thiết bị.
- Âm thanh giọng đọc phụ thuộc giọng tiếng Việt có sẵn trên hệ điều hành/trình duyệt.
- Các hình nhân vật/hành tinh dùng emoji và hiệu ứng CSS chuyển động; không phải mô hình 3D WebGL.


## v36 – Đường đua tri thức – AI nhanh hơn?
- Tích hợp menu Toán học → Chơi mà học → Đường đua tri thức; Giải cứu hành tinh vẫn là trò chơi độc lập.
- Thương hiệu: NGÔ MINH HIẾU – KHÁM PHÁ CHÂN TRỜI AI.
- Bảng giáo viên: môn học, lớp 1–5, tên bài, nội dung, 5/10/15 câu, ba mức độ.
- Ngân hàng câu hỏi mẫu; nhập/sửa/xóa/lưu câu hỏi thủ công trong localStorage. Không giả lập AI và không gọi API.
- Bốn đội luân phiên trả lời từng câu hỏi trong 20 giây; đúng +10 điểm, xe tiến 2 bước; sai/hết giờ xe đứng yên.
- Bảng điểm, xếp hạng, huy chương, pháo hoa, âm thanh và đọc tiếng Việt.
- Cache PWA nâng lên v36.


## v37 – Nhập ngân hàng câu hỏi từ Giải cứu hành tinh
- Bổ sung nút giáo viên “LẤY CÂU HỎI TỪ GIẢI CỨU HÀNH TINH” trong Đường đua tri thức.
- Chỉ nhập câu hỏi đúng môn học đang chọn; lớp được gán theo lựa chọn Lớp 1–5 hiện tại (Phương án A).
- Sao chép các trường câu hỏi, 4 phương án, đáp án đúng, gợi ý, giải thích và mức độ vào đúng cấu trúc ngân hàng hiện có của Đường đua tri thức.
- Không sửa cấu trúc hoặc dữ liệu gốc của Giải cứu hành tinh; không ghi đè câu hỏi đã có. Câu hỏi được lưu trong khóa lưu trữ hiện có của Đường đua tri thức.
- Cache PWA nâng lên v37.


## KHÁM PHÁ BÍ ẨN – ngân hàng 800 câu
- 4 chủ đề, mỗi chủ đề 200 câu: 70 dễ, 70 trung bình, 60 khó.
- Trong trò chơi, mở mục **QUẢN LÝ / NHẬP CÂU HỎI HÀNG LOẠT** để nhập CSV/JSON, xem trước, kiểm tra lỗi và thêm câu hợp lệ.
- Câu hỏi nhập thêm được lưu trong localStorage của trình duyệt trên thiết bị đang dùng; nên xuất JSON để sao lưu khi cần chuyển thiết bị/xóa dữ liệu trình duyệt.
- Có sẵn `NGAN_HANG_KHAM_PHA_BI_AN_800_CAU.json` và `MAU_NHAP_HANG_LOAT_KHAM_PHA_BI_AN.csv`.


## Cập nhật giao diện quản lý ngân hàng câu hỏi
- Các tiêu đề, nhãn, nút và hướng dẫn nhập dữ liệu đã được Việt hóa.
- Tệp mẫu CSV sử dụng tên cột tiếng Việt; hệ thống vẫn hỗ trợ dữ liệu JSON/CSV cũ dùng các khóa tiếng Anh.
- Nút mở quản lý ngân hàng đã được đồng bộ kiểu chữ, tăng độ đậm và độ rõ.
- Xem ảnh `MO_PHONG_GIAO_DIEN_VA_NHAN_VAT_4_DOI.png` để tham khảo phong cách nhân vật và giao diện.


## Cập nhật điều hướng KHÁM PHÁ BÍ ẨN
- Nút mở chủ đề đưa người dùng vào màn hình chủ đề và đặt trạng thái tab Trò chơi nhất quán với Toán học/Tiếng Anh.
- Nút Trang chủ, nút về trang chủ ở màn kết quả và các điểm đóng đều dọn màn hình đang mở, dừng đọc giọng nói và trở lại màn hình Chọn môn học.
- Có thể mở lại KHÁM PHÁ BÍ ẨN sau khi quay về trang chủ; các nút chọn chủ đề, bắt đầu thi, chơi lại và chọn chủ đề khác vẫn hoạt động theo luồng hiện có.


## Cập nhật giao diện KHÁM PHÁ BÍ ẨN – 09/11/2026

- Sửa điều hướng: khi chọn Trang chủ/MENU CHÍNH hoặc chuyển sang Toán học, Tiếng Anh, màn hình KHÁM PHÁ BÍ ẨN được ẩn hoàn toàn bằng cả trạng thái giao diện và thuộc tính `hidden`, tránh còn lớp giao diện bên dưới.
- Chuyển nút `CÀI ĐẶT CÂU HỎI` khỏi thanh điều hướng toàn cục vào trang MENU Toán học, đặt cạnh chức năng `THI TRẮC NGHIỆM`.
- Tích hợp ảnh nhân vật thám hiểm nhí vào phần giới thiệu KHÁM PHÁ BÍ ẨN; bốn ảnh đại diện theo màu đội được dùng ở lượt thi và bảng xếp hạng.
- Tăng phiên bản cache Service Worker để thiết bị tải phiên bản giao diện và ảnh đại diện mới.

Kiểm tra tĩnh: 9 thẻ script được phân tích; 8 khối JavaScript có nội dung đều vượt qua `node --check`; không phát hiện ID HTML trùng; tệp ngân hàng JSON có 800 câu (200 câu mỗi chủ đề; 70 dễ, 70 trung bình, 60 khó mỗi chủ đề).
