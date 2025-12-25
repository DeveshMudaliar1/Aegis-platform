def calculate_vix(severity: int, blast_radius: int, time_delta: float = 0.0) -> float:
    try:
        safe_time = max(float(time_delta), 1.0)
        weighted_severity = float(severity) * 1.5
        raw_score = (weighted_severity * float(blast_radius)) / safe_time * 100.0
        return min(max(round(raw_score, 1), 0.0), 100.0)
    except Exception:
        return 50.0
