<?php

namespace App\Http\Responses;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Http\Resources\Json\ResourceCollection;
use Illuminate\Http\Response;


class ApiResponse
{

    /**
     * Success response with data.
     *
     * @param mixed $data
     * @param string $message
     * @param int $statusCode
     * @return
     */
    public static function success(string|null $message, int $statusCode = Response::HTTP_OK, mixed $data = null, mixed $meta = null): JsonResponse
    {

        $response = [
            'success' => true,
            'message' => $message,
        ];

        if (isset($data)) {
            $response['data'] = $data;
        }

        if (isset($meta)) {
            $response['meta'] = $meta;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Error response.
     *
     * @param string $message
     * @param int $statusCode
     * @param array $errors
     * @return
     */
    public static function error(string $message = 'Error', int $statusCode = Response::HTTP_CREATED, mixed $errors = []): JsonResponse
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if (!empty($errors)) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $statusCode);
    }

    /**
     * Not found response.
     *
     * @param string $message
     * @return
     */
    public static function notFound(string $message = 'Resource not found'): JsonResponse
    {
        return self::error($message, Response::HTTP_NOT_FOUND);
    }

    /**
     * Unauthorized response.
     *
     * @param string $message
     * @return
     */
    public static function unauthorized(string $message = 'Unauthorized'): JsonResponse
    {
        return self::error($message, Response::HTTP_UNAUTHORIZED);
    }

    /**
     * Validation error response.
     *
     * @param array $errors
     * @param string $message
     * @return
     */
    public static function validationError(mixed $errors, string $message = 'Validation errors'): JsonResponse
    {
        return self::error($message, Response::HTTP_UNPROCESSABLE_ENTITY, $errors);
    }

    /**
     * No content response.
     *
     * @return
     */
    public static function noContent(): JsonResponse
    {
        return response()->json(null, Response::HTTP_NO_CONTENT);
    }

    /**
     * Server error response.
     *
     * @param string $message
     * @return
     */
    public static function serverError(string $message = 'Server Error'): JsonResponse
    {
        return self::error($message, Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}
