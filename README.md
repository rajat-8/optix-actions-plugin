# optix-actions-plugin

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `name`

**Required** The name of the person to greet. Default `"OptixJob"`.

## Outputs

### `time`

The time of process

## Example usage

```yaml
uses: actions/optix-actions-plugin@v1.1
with:
  name: 'Example Job'
```