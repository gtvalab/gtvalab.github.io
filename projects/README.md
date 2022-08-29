# How to update a project page

Start by copying `template.html` and filling in the section between the
"START CUSTOM CONTENT" and "END CUSTOM CONTENT" comments.

Use other project pages as a reference for what they put on their page!

You must manually add any publication elements to the page that you want.

**The project specific pages will not auto-update to reflect the
data that is in `/data/publications.json`.**

- If you want to program this functionality, reach out!

Simply copy and paste an existing publication format and edit the contents to
match the new publication. Here is an example:

```(html)
<div class="row publication-container">
    <div class="col s12 m4 l3 publication-img-container">
        <img src="/assets/images/bias_interact.png" class="publication-img" />
    </div>
    <div class="col 12 m8 l9">
        <p class="publication-content">
            <span class="publication-title">
                A Formative Study of Interactive Bias Metrics in Visual Analytics Using Anchoring Bias
            </span>
            <br />
            <span class="publication-authors">
                Emily Wall, Leslie Blaha, Celeste Paul, and Alex Endert
            </span>
            <br />
            <span class="publication-venue">
                Proceedings of the 17th IFIP TC 13 International Conference on Human-Computer Interaction
                (INTERACT'19), 2019
            </span>
        </p>
        <p class="publication-actions">
            <span class="publication-action">
                <a href="https://emilywall.github.io/media/papers/BiasINTERACT19.pdf" target="_blank">PDF</a>
            </span>
            <span>&nbsp;|&nbsp;</span>
            <span class="publication-action">
                <a href="https://youtu.be/Qis1YzYnCj4" target="_blank">Video</a>
            </span>
        </p>
    </div>
</div>
```
