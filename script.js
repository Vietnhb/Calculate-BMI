document.addEventListener('DOMContentLoaded', function () {
    const metricBtn = document.getElementById('metric');
    const imperialBtn = document.getElementById('imperial');
    const metricInputs = document.querySelector('.metric-inputs');
    const imperialInputs = document.querySelector('.imperial-inputs');
    const calculateBtn = document.getElementById('calculate');
    const result = document.getElementById('result');
    const bmiValue = document.querySelector('.bmi-value');
    const bmiCategory = document.querySelector('.bmi-category');
    const indicator = document.querySelector('.indicator');

    // Ẩn các trường nhập liệu hệ đo lường Imperial theo mặc định
    imperialInputs.style.display = 'none';

    // Xử lý chuyển đổi đơn vị
    metricBtn.addEventListener('click', function () {
        metricBtn.classList.add('active');
        imperialBtn.classList.remove('active');
        metricInputs.style.display = 'flex';
        imperialInputs.style.display = 'none';
    });

    imperialBtn.addEventListener('click', function () {
        imperialBtn.classList.add('active');
        metricBtn.classList.remove('active');
        imperialInputs.style.display = 'flex';
        metricInputs.style.display = 'none';
    });

    // Tính toán chỉ số BMI
    calculateBtn.addEventListener('click', function () {
        let bmi;
        let height;
        let weight;

        if (metricBtn.classList.contains('active')) {
            height = parseFloat(document.getElementById('height').value);
            weight = parseFloat(document.getElementById('weight').value);

            // Kiểm tra dữ liệu nhập vào có hợp lệ không
            if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
                alert('Vui lòng nhập chiều cao và cân nặng hợp lệ!');
                return;
            }

            // Chuyển đổi chiều cao từ cm sang m và tính BMI
            height = height / 100;
            bmi = weight / (height * height);
        } else {
            const feet = parseFloat(document.getElementById('feet').value);
            const inches = parseFloat(document.getElementById('inches').value);
            const pounds = parseFloat(document.getElementById('pounds').value);

            // Kiểm tra dữ liệu nhập vào có hợp lệ không
            if (isNaN(feet) || isNaN(inches) || isNaN(pounds) || feet <= 0 || pounds <= 0) {
                alert('Vui lòng nhập chiều cao và cân nặng hợp lệ!');
                return;
            }

            // Chuyển đổi chiều cao sang inches và tính BMI
            height = feet * 12 + inches;
            bmi = (pounds * 703) / (height * height);
        }

        // Làm tròn BMI đến 1 chữ số thập phân
        bmi = Math.round(bmi * 10) / 10;

        // Hiển thị kết quả
        bmiValue.textContent = bmi;

        // Tính vị trí chỉ báo (phần trăm của BMI trên thang đo)
        let position = 0;
        if (bmi < 18.5) {
            position = (bmi / 18.5) * 25;
        } else if (bmi < 25) {
            position = 25 + ((bmi - 18.5) / 6.5) * 25;
        } else if (bmi < 30) {
            position = 50 + ((bmi - 25) / 5) * 25;
        } else {
            position = 75 + Math.min((bmi - 30) / 10, 1) * 25;
            position = Math.min(position, 100);
        }

        // Đặt danh mục BMI và vị trí chỉ báo
        if (bmi < 18.5) {
            bmiCategory.textContent = 'Thiếu cân';
            bmiCategory.className = 'bmi-category underweight';
        } else if (bmi < 25) {
            bmiCategory.textContent = 'Cân đối';
            bmiCategory.className = 'bmi-category normal';
        } else if (bmi < 30) {
            bmiCategory.textContent = 'Thừa cân';
            bmiCategory.className = 'bmi-category overweight';
        } else {
            bmiCategory.textContent = 'Béo phì';
            bmiCategory.className = 'bmi-category obese';
        }

        indicator.style.left = `${position}%`;
        result.classList.add('visible');
    });
});
