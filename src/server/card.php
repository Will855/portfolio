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

// Obtener el ID de la tarjeta desde la URL
$id = isset($_GET['id']) ? intval($_GET['id']) : 0; // Asegurarse de que el ID sea un número entero

// Validar que el ID sea mayor que 0
if ($id <= 0) {
    echo json_encode(["message" => "ID inválido."]);
    exit();
}

// Preparar la consulta SQL para evitar inyecciones SQL
$stmt = $conn->prepare("SELECT title, content, gifSrc FROM cards WHERE id = ?");
$stmt->bind_param("i", $id); // 'i' indica que el parámetro es un entero

// Ejecutar la consulta
$stmt->execute();
$result = $stmt->get_result();

// Verificar si se encontró la tarjeta
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    
    // Sanitizar el contenido para evitar inyecciones
    $row['content'] = htmlspecialchars($row['content'], ENT_QUOTES, 'UTF-8');

    // Devolver los datos en formato JSON
    echo json_encode([
        "title" => $row['title'],
        "content" => $row['content'],
        "gifSrc" => $row['gifSrc']
    ]);
} else {
    echo json_encode(["message" => "No se encontró la tarjeta."]);
}

// Cerrar la declaración y la conexión
$stmt->close();
$conn->close();
?>