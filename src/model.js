import Field from './field'

// TODO: can we make the setters/removers a bit more ergonomic? can we just pass
// the field to remove/replace rather than having to know the field key?

/**
 * A Model represents a subgraph of an RDF graph.
 *
 * Rather than instantiate a Model directly, call createModel().
 */
class Model {
  /**
   * Rather than instantiate a Model directly, call createModel().
   *
   * @constructor
   *
   * @param {Immutable.Map<String, Field>} fields - a map of field keys to field
   * objects.  Field keys are aliases for a particular RDF predicate.
   */
  constructor (fields) {
    this._fields = fields
  }

  /**
   * Get all the fields for a given key.
   *
   * @param {String} key - the key of the fields to look up.
   * @returns {Field[]} An array of fields for the given key.
   */
  get (key) {
    return this._fields.get(key) || []
  }

  /**
   * Add a field to the model.
   *
   * @param {String} key - the key of the fields to add to.
   * @param {Field} field - the field to add.
   * @returns {Model} - the updated model.
   */
  add (key, field) {
    return new Model(
      this._fields.set(key, [...this._fields.get(key), field])
    )
  }

  /**
   * Remove a field from the model.
   *
   * @param {String} key - the key of the fields to remove from.
   * @param {Field} field - the field to remove.
   * @returns {Model} - the updated model.
   */
  remove (key, field) {
    return new Model(
      this._fields.set(
        key,
        this._fields.get(key).filter(f => field._id !== f._id)
      )
    )
  }

  /**
   * Replace a field on the model.
   *
   * @param {String} key - the key of the fields to replace within.
   * @param {Field} field - the field to replace.
   * @returns {Model} - the updated model.
   */
  set (key, oldField, newField) {
    return new Model(
      this._fields.set(
        key,
        this._fields.get(key).map(f => f._id === oldField._id ? newField : f)
      )
    )
  }
}

export default Model
