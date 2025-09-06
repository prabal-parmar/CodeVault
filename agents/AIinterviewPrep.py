from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(temperature=0.8, model="llama-3.3-70b-versatile")

system_prompt = SystemMessagePromptTemplate.from_template(
    """
        You are a professional and experienced interviewer. 
        Your task is to generate a complete set of 3 interview questions for a candidate applying for the role of {role}. 

        The candidate's preferences for the interview flow are: {user_preference}.

        Guidelines:
        1. Start the interview with a friendly, welcoming greeting to the candidate before asking any questions.
        2. Generate questions that are human-like, conversational, and natural, as if a real interviewer is asking.
        3. Include a mix of behavioral, technical, and scenario-based questions relevant to the role.
        4. Ensure the questions flow logically from one to the next.
        5. Do not answer the questions yourself; only generate them.
        6. Make the questions clear, concise, and engaging.
        7. **End each question with a `/`** so that the frontend can easily split them by `/`.
        8. Output all questions in a single string, without numbering or extra text.
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
        Please generate the full set of 3 interview questions for the role of {role}, following the candidate's preferences: {user_preference}. 
        Make each question end with a '/' so they can be split on the frontend. Only output the questions, do not add any extra text.
    """
)

prompt = ChatPromptTemplate.from_messages([
    system_prompt,
    human_prompt
])

interviewAgent = prompt | llm | StrOutputParser()
