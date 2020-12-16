import os

from inginious.common.tasks_problems import CodeProblem
from inginious.frontend.task_problems import DisplayableCodeProblem
from .constants import get_linter_url, get_python_tutor_url, get_show_tools, get_python_tutor_py2_url
from .languages import get_all_available_languages
from collections import OrderedDict

path_to_plugin = os.path.abspath(os.path.dirname(__file__))


class CodeMultipleLanguagesProblem(CodeProblem):
    def __init__(self, task, problemid, content, translations=None):
        CodeProblem.__init__(self, task, problemid, content, translations)
        self._languages = content["languages"]

    @classmethod
    def get_type(cls):
        return "code_multiple_languages"


class DisplayableCodeMultipleLanguagesProblem(CodeMultipleLanguagesProblem, DisplayableCodeProblem):
    def __init__(self, task, problemid, content, translations=None):
        CodeMultipleLanguagesProblem.__init__(self, task, problemid, content, translations)

    @classmethod
    def get_renderer(cls, template_helper):
        """ Get the renderer for this class problem """
        return template_helper.get_custom_renderer(os.path.join(path_to_plugin, "templates"), False)

    @classmethod
    def get_type_name(cls, gettext):
        return gettext("Code multiple languages")

    @classmethod
    def show_editbox(cls, template_helper, key):
        renderer = DisplayableCodeMultipleLanguagesProblem.get_renderer(template_helper)
        return renderer.multilang_edit(key, get_all_available_languages())

    def show_input(self, template_helper, language, seed):
        allowed_languages = {language: get_all_available_languages()[language] for language in self._languages}
        dropdown_id = self.get_id() + "/language"
        custom_input_id = self.get_id() + "/input"

        task = self.get_task()
        course_id = task.get_course().get_id()
        environment = task.get_environment()

        renderer = DisplayableCodeMultipleLanguagesProblem.get_renderer(template_helper)
        allowed_languages = OrderedDict([(lang, allowed_languages[lang]) for lang in sorted(allowed_languages.keys())])
        multiple_language_render = str(
            renderer.multilang(self.get_id(), dropdown_id, allowed_languages, self.get_id(), self.get_type(),
                               task_id=self.get_task().get_id(), course_id=course_id, environment=environment))
        standard_code_problem_render = super(DisplayableCodeMultipleLanguagesProblem, self).show_input(template_helper,
                                                                                                       language, seed)
        tools_render = ""
        if get_show_tools():
            tools_render = str(
                renderer.tools(self.get_id(), "plain", custom_input_id, self.get_type(), get_python_tutor_url(),
                               get_python_tutor_py2_url(),
                               get_linter_url(), course_id=self.get_task().get_course_id()))

        return multiple_language_render + standard_code_problem_render + tools_render
