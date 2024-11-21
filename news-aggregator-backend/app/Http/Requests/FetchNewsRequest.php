<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class FetchNewsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'sources' => 'nullable|string',
            'categories' => 'nullable|string',
            'authors' => 'nullable|string',
            'keyword' => 'nullable|string|max:255',
            'page' => 'nullable|integer|min:1',
        ];
    }

    /**
     * Customize the error messages for validation rules.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'sources.string' => 'The sources filter must be a string.',
            'categories.string' => 'The categories filter must be a string.',
            'authors.string' => 'The authors filter must be a string.',
            'keyword.string' => 'The keyword must be a valid string.',
            'keyword.max' => 'The keyword may not be greater than 255 characters.',
            'page.integer' => 'The page number must be an integer.',
            'page.min' => 'The page number must be at least 1.',
        ];
    }
}
