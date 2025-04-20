FROM python:3.10

WORKDIR /app

COPY . .


RUN pip install --upgrade pip

# Install requirements
COPY requirements.txt .

RUN pip install -r requirements.txt

ENV PYTHONPATH=/app

EXPOSE 5000

CMD ["python", "app/main.py"]
