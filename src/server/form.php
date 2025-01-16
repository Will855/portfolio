<?php
header("Access-Control-Allow-Origin: *"); // Permitir solicitudes desde cualquier origen
header("Content-Type: application/json; charset=UTF-8"); // Establecer el tipo de contenido a JSON

// Conectar a la base de datos (ajusta según tu configuración)
$servername = "localhost";
$username = "tu_usuario";
$password = "tu_contraseña";
$dbname = "tu_base_de_datos";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    echo json_encode(["message" => "Conexión fallida: " . $conn->connect_error]);
    exit();
}

// Manejar la solicitud POST
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Obtener los datos del cuerpo de la solicitud
    $input = json_decode(file_get_contents('php://input'), true);

    // Validar y sanitizar los datos
    $name = isset($input['name']) ? htmlspecialchars(trim($input['name'])) : '';
    $email = isset($input['email']) ? htmlspecialchars(trim($input['email'])) : '';
    $phone = isset($input['phone']) ? htmlspecialchars(trim($input['phone'])) : '';
    $message = isset($input['message']) ? htmlspecialchars(trim($input['message'])) : '';

    // Validar que los campos no estén vacíos
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["message" => "Por favor, completa todos los campos."]);
        exit();
    }

    // Preparar la consulta SQL para evitar inyecciones SQL
    $stmt = $conn->prepare("INSERT INTO contactos (name, email, phone, message) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $name, $email, $phone, $message);

    // Ejecutar la consulta y verificar el resultado
    if ($stmt->execute()) {
        echo json_encode(["message" => "Mensaje enviado con éxito."]);
    } else {
        echo json_encode(["message" => "Error al enviar el mensaje: " . $stmt->error]);
    }

    // Cerrar la declaración
    $stmt->close();
} else {
    echo json_encode(["message" => "Método no permitido."]);
}

// Cerrar la conexión
$conn->close();
?>