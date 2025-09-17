from langchain.prompts import ChatPromptTemplate, SystemMessagePromptTemplate, HumanMessagePromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv

load_dotenv()

llm = ChatGroq(temperature=0, model="llama-3.3-70b-versatile")

system_prompt = SystemMessagePromptTemplate.from_template(
    """
    You are an expert software engineer and static code analyzer.

    Your task is to analyze the given code and detect all possible issues.

    Instructions:
    1. The user will provide code in any programming language.
    2. You must identify bugs, runtime errors, logical flaws, or bad practices.
    3. Always respond in strict JSON format with the following keys:
    - "syntax_errors": List of syntax-related issues (or empty list if none).
    - "runtime_errors": List of potential runtime errors (or empty list if none).
    - "logical_errors": List of logical flaws or incorrect logic (or empty list if none).
    - "best_practices": List of improvements or warnings regarding style/performance (or empty list if none).
    - "conclusion": A short summary about the overall code quality.

    Rules:
    - Do not include any explanation outside the JSON.
    - If no issues are found, return empty lists and a conclusion stating "No major issues found".
    """
)

human_prompt = HumanMessagePromptTemplate.from_template(
    """
        Analyze the following code and find any bugs or errors.

        Language: {language}
        Code:
        {code}

        Provide a list of bugs, potential issues, or logical errors in a clear, step-by-step manner.
    """
)

prompt = ChatPromptTemplate.from_messages([
    system_prompt,
    human_prompt
])

bugFinderAgent = prompt | llm | StrOutputParser()