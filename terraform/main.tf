provider "aws" {
  region = "ap-northeast-2"  # Change to your preferred region
}

# Fetch GitHub Actions IP ranges
data "http" "myip" {
  url = "http://ipv4.icanhazip.com"
}

# Create Security Group
resource "aws_security_group" "coldsurf-terraform-sg" {
  name        = "coldsurf-terraform-sg"
  description = "Security group for coldsurf and terraform"

  ingress {
    from_port   = 22  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks       = ["${chomp(data.http.myip.body)}/32"]
  }

  ingress {
    from_port   = 4000  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 4000
    protocol    = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    description = "blog-client"
  }

  ingress {
    from_port   = 3002  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 3002
    protocol    = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    description = "wamuseum-server"
  }

  ingress {
    from_port   = 3001  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 3001
    protocol    = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    description = "billets-server"
  }

  ingress {
    from_port   = 3000  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    description = "wamuseum-client"
  }

  ingress {
    from_port   = 443  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    description = "open https to public"
  }

  ingress {
    from_port   = 80  # Replace with the port you need (e.g., 22 for SSH)
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks       = ["0.0.0.0/0"]
    description = "open http to public"
  }

  # Egress rules (outbound traffic rules)
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"  # Allow all outbound traffic (default)
    cidr_blocks = ["0.0.0.0/0"]  # Allow all outbound traffic
  }

  tags = {
    Name = "ColdSurf Security Group"
  }
}
