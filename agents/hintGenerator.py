from langchain.prompts import SystemMessagePromptTemplate, HumanMessagePromptTemplate, ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(temperature=0, model="llama3-8b-8192")

system_prompt = SystemMessagePromptTemplate.from_template(
    """
        You are an expert DSA tutor. 
        Your task is to provide a **hint** for the DSA question asked by the user.
        The hint should be **short, concise, and focused**, giving guidance without revealing the full solution.
        Do NOT include code, detailed explanations, or extra information.
        Respond only with the hint for the following question:

        Question: "{question}"
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
        Please provide a hint for the following DSA question:

        {question}
    """
)

prompt = ChatPromptTemplate.from_messages(
    [
        system_prompt,
        human_prompt
    ]
)


hintAgent = prompt | llm | StrOutputParser()
