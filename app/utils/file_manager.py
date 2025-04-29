import os
import uuid
from werkzeug.utils import secure_filename

class FileManager:
    def __init__(self, upload_folder):
        self.upload_folder = upload_folder
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

    def upload_file(self, file):
        if file is None:
            raise ValueError("No se proporcionó un archivo para subir.")

        filename = secure_filename(file.filename)
        unique_filename = f"{uuid.uuid4().hex}{os.path.splitext(filename)[1]}"
        file_path = os.path.join(self.upload_folder, unique_filename)
        file.save(file_path)

        return f"/uploads/recetas/{unique_filename}"

    def delete_file(self, file_path):
        # Verificar si el archivo existe antes de eliminarlo
        if os.path.exists(file_path):
            os.remove(file_path)
            return True
        return False
