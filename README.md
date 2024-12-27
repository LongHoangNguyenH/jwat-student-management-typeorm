Practice 04:
Tạo DB Postgres = Docker
Kết nối Backend NestJS và DB sử dụng TypeORM
Convert việc sử dụng Array sang DB
Lưu ý: submit file migration để Mentor có thể migrate DB
(Thỏa mãn tất cả các requirements của bài API trước)

Due Date: 27/12

vì đang sử dụng db nên 1 số constrain có thể bỏ qua vì nó tự động có sẵn
+ bỏ check uuid nhưng phải check classname và student name

<!-- - 1 HS chỉ thuộc về duy nhất 1 class // One to Many -->
<!-- - Class Name không được phép trùng // class Name enable thuộc unique -->
<!-- - Student Name không được phép trùng.// studentName enable thuộc unique -->
<!-- - 1 HS phải thuộc về 1 class nào đó. // classname not null -->
<!-- - 1 Class có thể có nhiều học sinh // Many to One -->

review code:
- Sửa lại guard (phải đúng chính xác bear authorization)

- sửa lại phần filter không cần check instanceof (sau sử dụng với graphql cũng vậy)

- xem lại phần update student
+ Không cần tới thằng pipe
+ việc những trường optional thì có thể xử lý bằng cách if(studentDto?.name) 

- việc sử dụng repository hoặc entity manager thì tùy vào ngữ cảnh
nhưng nếu đã sử dụng entity manager thì hãy sử dụng luôn vì dùng repository sẽ phải
inject nhiều lần.

- xem lại có thẻ dùng cascade

- xem lại có thể sử dụng transaction hay không

