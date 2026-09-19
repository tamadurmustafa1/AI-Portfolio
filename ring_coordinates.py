import math
n = 11
for i in range(n):
    angle = math.radians(-90 + i * 360 / n)
    x = 50 + 42 * math.cos(angle)
    y = 50 + 42 * math.sin(angle)
    print(i + 1, f"{x:.4f}%", f"{y:.4f}%", f"{math.degrees(angle):.4f}deg")
