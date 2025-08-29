from langchain.prompts import HumanMessagePromptTemplate, SystemMessagePromptTemplate, ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(temperature=0, model="llama3-8b-8192")

system_prompt = SystemMessagePromptTemplate.from_template(
    """
        You are an expert DSA tutor. 
        Your task is to generate a **random DSA question** from the specified topic: "{topic}".
        The question should be **clear, concise, and appropriate** for practicing algorithms and data structures.
        Do NOT provide the solution, hint, or any explanation — only the question text.
        Ensure the question is related to DSA and relevant to the topic "{topic}".
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
        Please generate one random DSA question from the topic: {topic}.
        Only provide the question text. Do NOT include the solution or any hints.
    """
)

prompt = ChatPromptTemplate.from_messages(
    [
        system_prompt,
        human_prompt
    ]
)

randomCodeAgent = prompt | llm | StrOutputParser()