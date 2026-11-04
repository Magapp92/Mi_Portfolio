#!/usr/bin/env bash
# Hook SessionEnd: al cerrar la sesión de Claude Code guarda todos los cambios
# de portfolio_react en un commit y los sube a GitHub (cuenta Magapp92).
# Deja constancia de cada ejecución en .claude/hooks/guardar-sesion.log.

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}" || exit 0
LOG=".claude/hooks/guardar-sesion.log"

{
    echo "== $(date '+%Y-%m-%d %H:%M:%S')"

    git rev-parse --git-dir >/dev/null 2>&1 || { echo "No es un repositorio git"; exit 0; }

    if [ -n "$(git status --porcelain)" ]; then
        git add -A

        # Barrera de seguridad: nunca subir un .env aunque falle el .gitignore.
        if git diff --cached --name-only | grep -qE '(^|/)\.env($|\.)' && \
           git diff --cached --name-only | grep -E '(^|/)\.env($|\.)' | grep -vq '\.env\.example$'; then
            git reset -q
            echo "ABORTADO: había un .env en el commit. No se ha guardado nada."
            exit 0
        fi

        git commit -q -m "Guardado automático $(date '+%Y-%m-%d %H:%M')" && echo "Commit creado"
    else
        echo "Sin cambios"
    fi

    if git remote get-url origin >/dev/null 2>&1; then
        git push -q -u origin HEAD 2>&1 && echo "Push correcto"
    else
        echo "Sin remoto 'origin': solo commit local"
    fi
} >> "$LOG" 2>&1

exit 0
