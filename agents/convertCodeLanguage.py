from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(temperature=0, model="llama-3.3-70b-versatile")

system_prompt = SystemMessagePromptTemplate.from_template(
    """
        You are a code converter AI. 

        Your task is to convert programming code from one language to another.

        Rules:
        1. Only return the converted code. 
        2. Do NOT include triple quotes, Markdown fences, or language names. 
        3. Do NOT explain anything.
        4. Maintain the logic and functionality of the code.
        5. Preserve variable names unless they conflict with the target language.
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
        Convert the following code to {language}.

        Do NOT include triple quotes, Markdown fences, or language names. Return only raw code.

        {code}
    """
)

prompt = ChatPromptTemplate.from_messages([
    system_prompt,
    human_prompt
])

codeLanguageConvertorAgent = prompt | llm | StrOutputParser()