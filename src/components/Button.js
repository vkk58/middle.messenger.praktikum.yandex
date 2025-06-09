export default `<button id="{{id}}" class="{{class}}"
{{#if isTypeSubmit}}
  type="submit"
{{/if}}
{{#if disabled}}
  disabled
{{/if}}>{{text}}</button>`;
