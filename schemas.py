from typing import Literal
from pydantic import BaseModel, Field

class LearningPriority(BaseModel):
    skill:str = Field(description="A skill the candidate should learn")
    priority: Literal["High", "Medium", "Low"]
    reason: str = Field(description="why this skill matters for the role")


class JobAnalysis(BaseModel):
    job_title: str = Field(description="Title of the job")
    experience_level: str = Field(
        description="Expected experience level of the job"
    )
    job_summary:str = Field(
        description="a concise summary of the job description"
    )
    required_skills: list[str] = Field(
        description="Technical and non Technical skills required"
    )
    responsibilities: list[str] = Field(
        description="Main responsibilites of the role"
    )
    learning_priorities: list[LearningPriority] = Field(
        description="Prioritized skills for a candidate to learn"
    )