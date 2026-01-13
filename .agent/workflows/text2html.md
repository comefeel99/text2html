---
description: Text to HTML Slide Generation Workflow
---

This workflow outlines the steps to convert a text request into an HTML slide presentation using a 4-stage multi-agent process.

1. **Research Phase**
   - Read the user's request.
   - Read `prompts/1_research.md`.
   - Use the `search_web` tool to gather relevant information and URLs as per the prompt instructions. Focus on gathering diverse data points.

2. **Report Phase**
   - Read `prompts/2_report.md`.
   - Combine the user's request and the gathered research results (URLs and summaries).
   - Generate a comprehensive report structure that organizes the information for a presentation.

3. **HTML Generation Phase**
   - Read `prompts/3_html_gen.md`.
   - Use the report content generated in the previous step.
   - Generate the initial HTML code for the slides. Ensure each slide focuses on one key idea.

4. **Review and Refine Phase**
   - Read `prompts/4_review.md`.
   - Review the generated HTML code against the user's original request and the review prompt criteria (design, layout, clarity).
   - correct and refine the HTML code to produce the final polished output.
   - Save the final HTML to a file (e.g., `output.html`) and present it to the user.
