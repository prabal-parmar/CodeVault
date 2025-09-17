from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(temperature=0, model="llama-3.3-70b-versatile")

system_prompt = SystemMessagePromptTemplate.from_template(
    """
    You are a programming language detector. 
    Your task is to identify the programming language of the given code snippet.

    Rules:
    1. Only return the language name (e.g., Python, JavaScript, Cpp, Java, Ruby, Go, etc.).
    2. If the language cannot be confidently identified, return "Unknown".
    3. Do not provide any explanations or extra text — only the language name.
    4. Code snippets may be short or long, but always return a single language name.
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
    Identify the programming language of the following code snippet: {code}
    """
)

prompt = ChatPromptTemplate.from_messages([
    system_prompt,
    human_prompt
])

langGusserAgent = prompt | llm | StrOutputParser()